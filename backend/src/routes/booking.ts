import { Router, type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

import fs from "fs";
import path from "path";
import { google } from "googleapis";

const serviceAccountPath = path.resolve(process.cwd(), "service-account.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

const CALENDAR_ID =
  "c981b1c0bfa0376252a6f8a18567e24a0a870c37c480c460aec6fff7708e8368@group.calendar.google.com";

const router = Router();
const prisma = new PrismaClient();

const serviceDurations: Record<string, number> = {
  "laminacja-brwi": 120,
  "laminacja-brwi-koloryzacja": 120,
  "geometria-brwi-koloryzacja": 120,
  "lifting-rzes": 90,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
};

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      from_name: name,
      customer_email: email,
      from_phone: phone,
      booking_date: bookingDate, // ISO string like "2025-08-27T22:00:00.000Z"
      booking_time: bookingTime, // format: "11:00-13:00"
      selected_service: service,
      service_duration: serviceDuration,
    } = req.body;

    if (
      !name ||
      !phone ||
      !bookingDate ||
      !bookingTime ||
      !service ||
      !serviceDuration
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = await prisma.booking.create({
      data: {
        clientName: name,
        clientEmail: email || "",
        clientPhone: phone,
        booking_date: new Date(bookingDate),
        booking_time: bookingTime,
        service: service,
        duration: serviceDuration,
        reservation_date: new Date(),
      },
    });

    try {
      // Extract start time from "11:00-13:00"
      const [startTimeStr] = bookingTime.split("-");
      const [startHour, startMinute] = startTimeStr.split(":").map(Number);

      // Construct start date
      const startDate = new Date(bookingDate);
      startDate.setHours(startHour, startMinute, 0, 0);

      // Calculate end date based on service duration in minutes
      const endDate = new Date(startDate.getTime() + serviceDuration * 60000);

      await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: {
          summary: `Rezerwacja: ${service}`,
          description: `Kilent: ${name}\nTelefon: ${phone}\nEmail: ${
            email || "brak maila"
          }`,
          start: {
            dateTime: startDate.toISOString(),
            timeZone: "Europe/Warsaw",
          },
          end: {
            dateTime: endDate.toISOString(),
            timeZone: "Europe/Warsaw",
          },
        },
      });
    } catch (err) {
      console.error("Failed to create calendar event:", err);
    }

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/available-slots", async (req: Request, res: Response) => {
  try {
    const dateParam = req.query.date as string;
    const serviceParam = req.query.service as string;

    if (!dateParam || !serviceParam) {
      return res.status(400).json({
        error: "Missing required date and service parameters",
      });
    }

    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return res.status(400).json({
        error: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    const serviceDuration = serviceDurations[serviceParam] || 120;
    const roundedDuration = serviceDuration >= 90 ? 120 : serviceDuration;

    // Day boundaries
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Define all possible 2-hour slots
    const allSlots = [
      "08:00-10:00",
      "09:00-11:00",
      "10:00-12:00",
      "11:00-13:00",
      "12:00-14:00",
      "13:00-15:00",
      "14:00-16:00",
      "15:00-17:00",
      "16:00-18:00",
    ];

    // Fetch bookings for the day
    const bookings = await prisma.booking.findMany({
      where: {
        booking_date: { gte: startOfDay, lte: endOfDay },
      },
    });

    const unavailable = new Set<string>();

    bookings.forEach((booking) => {
      const durationMins = booking.duration >= 90 ? 120 : booking.duration;
      const [startTimeStr] = booking.booking_time.split("-");
      const bookingStart = timeToMinutes(startTimeStr);
      const bookingEnd = bookingStart + durationMins;

      allSlots.forEach((slot) => {
        const [slotStartStr, slotEndStr] = slot.split("-");
        const slotStart = timeToMinutes(slotStartStr);
        const slotEnd = timeToMinutes(slotEndStr);

        // Check for overlap
        if (bookingStart < slotEnd && bookingEnd > slotStart) {
          unavailable.add(slot);
        }
      });
    });

    const availableSlots = allSlots.filter((slot) => !unavailable.has(slot));

    res.json({
      availableSlots,
      date: dateParam,
      service: serviceParam,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});

export default router;
