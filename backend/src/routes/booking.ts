import { Router, type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// // Generate time slots helper function
// const generateTimeSlots = (serviceDuration: number): string[] => {
//   const slots: string[] = [];
//   const startHour = 8; // 8:00 AM
//   const endHour = 18; // 6:00 PM
//   const slotDuration = serviceDuration; // Duration in minutes

//   for (let hour = startHour; hour < endHour; hour++) {
//     for (let minute = 0; minute < 60; minute += slotDuration) {
//       const startTime = new Date();
//       startTime.setHours(hour, minute, 0, 0);

//       const endTime = new Date(startTime.getTime() + slotDuration * 60000);

//       // Stop if end time exceeds business hours
//       if (endTime.getHours() > endHour) break;

//       const formatTime = (date: Date) =>
//         date.toLocaleTimeString("pl-PL", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: false,
//         });

//       slots.push(`${formatTime(startTime)} - ${formatTime(endTime)}`);
//     }
//   }
//   return slots;
// };

// // Get availability for a specific date and service
// router.get("/available-slots", async (req: Request, res: Response) => {
//   try {
//     const { date, service } = req.query;

//     if (!date || !service) {
//       return res.status(400).json({ error: "Date and service are required" });
//     }

//     const serviceDuration = serviceDurations[service as string] || 120;
//     const allTimeSlots = generateTimeSlots(serviceDuration);

//     // Get existing bookings for the date
//     const startOfDay = new Date(date as string);
//     startOfDay.setHours(0, 0, 0, 0);

//     const endOfDay = new Date(date as string);
//     endOfDay.setHours(23, 59, 59, 999);

//     const existingBookings = await prisma.booking.findMany({
//       where: {
//         booking_date: {
//           gte: startOfDay,
//           lte: endOfDay,
//         },
//       },
//       select: {
//         booking_time: true,
//       },
//     });

//     const bookedSlots = existingBookings.map((booking) => booking.booking_time);
//     const availableSlots = allTimeSlots.filter(
//       (slot) => !bookedSlots.includes(slot)
//     );

//     res.json({ availableSlots });
//   } catch (error) {
//     console.error("Error fetching availability:", error);
//     res.status(500).json({ error: "Failed to fetch availability" });
//   }
// });

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

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

const serviceDurations: Record<string, number> = {
  "laminacja-brwi": 120,
  "laminacja-brwi-koloryzacja": 120,
  "geometria-brwi-koloryzacja": 120,
  "lifting-rzes": 90,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
};

router.get("/available-slots", async (req: Request, res: Response) => {
  try {
    const dateParam = req.query.date as string;
    const serviceParam = req.query.service as string;

    if (!dateParam) {
      return res
        .status(400)
        .json({ error: "Missing required date parameter (YYYY-MM-DD)" });
    }
    if (!serviceParam) {
      return res
        .status(400)
        .json({ error: "Missing required service parameter" });
    }

    const serviceDuration = serviceDurations[serviceParam] || 120;
    const roundedDuration = serviceDuration >= 90 ? 120 : serviceDuration;

    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Day boundaries
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Define all possible overlapping 2-hour slots
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
        booking_date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    console.log("BOOKINGS", bookings);

    const unavailable = new Set<string>();

    bookings.forEach((booking) => {
      const durationMins = booking.duration >= 90 ? 120 : booking.duration;
      const [startTimeStr] = booking.booking_time.split("-");
      const bookingStart = timeToMinutes(startTimeStr);
      const bookingEnd = bookingStart + durationMins;

      console.log(`Booking: ${booking.booking_time}, Start: ${bookingStart}, End: ${bookingEnd}, Duration: ${durationMins}`);

      allSlots.forEach((slot) => {
        const [slotStartStr, slotEndStr] = slot.split("-");
        const slotStart = timeToMinutes(slotStartStr);
        const slotEnd = timeToMinutes(slotEndStr);

        // Overlap check
        if (bookingStart < slotEnd && bookingEnd > slotStart) {
          console.log(`Slot ${slot} conflicts with booking ${booking.booking_time}`);
          unavailable.add(slot);
        }
      });
    });

    // Filter slots that do not overlap with any booking
    const availableSlots = allSlots.filter((slot) => !unavailable.has(slot));

    res.json({
      date: dateParam,
      service: serviceParam,
      serviceDuration: roundedDuration,
      availableSlots,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});

export default router;
