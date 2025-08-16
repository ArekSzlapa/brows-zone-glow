/* eslint-disable @typescript-eslint/no-require-imports */

const { Pool } = require("pg");
const fs = require("fs");
const { google } = require("googleapis");
const nodePath = require("path");
const nodeExpress = require("express");
const nodeDotenv = require("dotenv");
const axios = require("axios");

nodeDotenv.config();

// === Połączenie z PostgreSQL ===
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
});

// === Google Calendar ===
const serviceAccountPath = nodePath.resolve(
  process.cwd(),
  "service-account.json"
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

const CALENDAR_ID =
  "c981b1c0bfa0376252a6f8a18567e24a0a870c37c480c460aec6fff7708e8368@group.calendar.google.com";

const router = nodeExpress.Router();

const serviceDurations = {
  "laminacja-brwi": 120,
  "laminacja-brwi-koloryzacja": 120,
  "geometria-brwi-koloryzacja": 120,
  "lifting-rzes": 90,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
};

// Funkcja pomocnicza do zamiany HH:mm → minuty
function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
async function sendEmail({ serviceId, templateId, userId, templateParams }) {
  try {
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: templateParams,
      }
    );
    console.log(
      `Email sent via EmailJS template ${templateId}:`,
      response.data
    );
  } catch (error) {
    console.error(`Error sending EmailJS template ${templateId}:`);
  }
}

// === POST /api/bookings ===
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post("/", async (req, res) => {
  console.log("BODY", req.body);
  try {
    const {
      from_name: name,
      customer_email: email,
      from_phone: phone,
      booking_date: bookingDate, // teraz w formacie DD/MM/YYYY
      booking_time: bookingTime, // np. "09:00 - 11:00"
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

    // Konwersja DD/MM/YYYY → YYYY-MM-DD
    const [day, month, year] = bookingDate.split("/");
    const bookingDateISO = `${year}-${month}-${day}`;

    // Pobranie samej godziny startu
    const bookingTimeOnly = bookingTime.split("-")[0].trim();

    // Zapytanie SQL
    const insertQuery = `
      INSERT INTO booking
        (client_name, client_email, client_phone, reservation_date, booking_time, service, duration, created_at)
      VALUES
        ($1, $2, $3, $4::date, $5::time, $6, $7, NOW())
      RETURNING *;
    `;

    const values = [
      name,
      email || "",
      phone,
      bookingDateISO,
      bookingTimeOnly,
      service,
      serviceDuration,
    ];

    console.log("DB VALUES", values);

    const { rows } = await pool.query(insertQuery, values);
    const newBooking = rows[0];

    // Dodanie wydarzenia do Google Calendar (bez przesunięcia daty)
    try {
      const [startHour, startMinute] = bookingTimeOnly.split(":").map(Number);

      // Tworzymy datę w strefie Europe/Warsaw
      const startDate = new Date(
        year,
        Number(month) - 1,
        Number(day),
        startHour,
        startMinute
      );
      const endDate = new Date(startDate.getTime() + serviceDuration * 60000);

      await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: {
          summary: `Rezerwacja: ${service}`,
          description: `Klient: ${name}\nTelefon: ${phone}\nEmail: ${
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

      // Send confirmation email to customer
      await sendEmail({
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID_CUSTOMER,
        userId: process.env.EMAILJS_PUBLIC_KEY,
        templateParams: {
          customer_name: name,
          booking_date: bookingDateOnly,
          booking_time: bookingTimeOnly,
          booking_service: service,
          customer_email: email,
        },
      });

      // Send notification email to you (admin)
      await sendEmail({
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID_ADMIN,
        userId: process.env.EMAILJS_PUBLIC_KEY,
        templateParams: {
          admin_name: "Brows Zone",
          customer_name: name,
          booking_date: bookingDateOnly,
          booking_time: bookingTimeOnly,
          booking_service: service,
          customer_phone: phone,
          customer_email: email,
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

// === GET /api/bookings/available-slots ===
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get("/available-slots", async (req, res) => {
  try {
    const dateParam = req.query.date;
    const serviceParam = req.query.service;

    if (!dateParam || !serviceParam) {
      return res.status(400).json({
        error: "Missing required date and service parameters",
      });
    }

    const allSlots = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const bookingsQuery = `
      SELECT booking_time, duration
      FROM booking
      WHERE reservation_date = $1::date;
    `;

    const { rows: bookings } = await pool.query(bookingsQuery, [dateParam]);
    const unavailable = new Set();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    bookings.forEach((booking) => {
      const bookingStart = timeToMinutes(
        booking.booking_time.toString().substring(0, 5)
      );
      const bookingEnd = bookingStart + booking.duration;

      allSlots.forEach((slot) => {
        const slotStart = timeToMinutes(slot);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const slotEnd = slotStart + (serviceDurations[serviceParam] || 0);

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

module.exports = router;
