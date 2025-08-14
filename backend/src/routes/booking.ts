import { Router, type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/booking", async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      bookingDate,
      bookingTime,
      service,
      serviceDuration,
      formattedDateTime,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !bookingDate ||
      !bookingTime ||
      !service ||
      !serviceDuration ||
      !formattedDateTime
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
        reservation_date: new Date(formattedDateTime),
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
