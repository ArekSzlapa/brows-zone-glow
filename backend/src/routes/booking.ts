import { Router, type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Service duration mapping in minutes
const serviceDurations: Record<string, number> = {
  "laminacja-brwi": 120,
  "laminacja-brwi-koloryzacja": 120,
  "geometria-brwi-koloryzacja": 120,
  "lifting-rzes": 90,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
};

// Generate time slots helper function
const generateTimeSlots = (serviceDuration: number): string[] => {
  const slots: string[] = [];
  const startHour = 8; // 8:00 AM
  const endHour = 18; // 6:00 PM
  const slotDuration = serviceDuration; // Duration in minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const startTime = new Date();
      startTime.setHours(hour, minute, 0, 0);

      const endTime = new Date(startTime.getTime() + slotDuration * 60000);

      // Stop if end time exceeds business hours
      if (endTime.getHours() > endHour) break;

      const formatTime = (date: Date) =>
        date.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

      slots.push(`${formatTime(startTime)} - ${formatTime(endTime)}`);
    }
  }
  return slots;
};

// Get availability for a specific date and service
router.get("/availability", async (req: Request, res: Response) => {
  try {
    const { date, service } = req.query;

    if (!date || !service) {
      return res.status(400).json({ error: "Date and service are required" });
    }

    const serviceDuration = serviceDurations[service as string] || 120;
    const allTimeSlots = generateTimeSlots(serviceDuration);
    
    // Get existing bookings for the date
    const startOfDay = new Date(date as string);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date as string);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBookings = await prisma.booking.findMany({
      where: {
        booking_date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        booking_time: true,
      },
    });

    const bookedSlots = existingBookings.map((booking) => booking.booking_time);
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({ availableSlots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ error: "Failed to fetch availability" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      from_name: name,
      customer_email: email,
      from_phone: phone,
      booking_date: bookingDate,
      booking_time: bookingTime,
      selected_service: service,
      service_duration: serviceDuration,
      //   formattedDateTime,
    } = req.body;

    console.log(
      "DUPA",
      !name,
      !email,
      !phone,
      !bookingDate,
      !bookingTime,
      !service,
      !serviceDuration
    );

    if (
      !name ||
      !email ||
      !phone ||
      !bookingDate ||
      !bookingTime ||
      !service ||
      !serviceDuration
      //   !formattedDateTime
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = await prisma.booking.create({
      data: {
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        booking_date: new Date(bookingDate),
        booking_time: bookingTime,
        service: service,
        duration: serviceDuration,
        reservation_date: new Date(),
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
