/* eslint-disable @typescript-eslint/no-require-imports */

const { Pool } = require("pg");
const fs = require("fs");
const { google } = require("googleapis");
const nodePath = require("path");
const nodeExpress = require("express");
const nodeDotenv = require("dotenv");

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

// === POST /api/bookings ===
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post("/", async (req, res) => {
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
    const dateParam = req.query.date; // format YYYY-MM-DD
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

    const unavailable = new Set();

    // 2️⃣ Pobranie eventów z Google Calendar
    const dayStart = new Date(`${dateParam}T00:00:00+02:00`);
    const dayEnd = new Date(`${dateParam}T23:59:59+02:00`);

    const googleEvents = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    googleEvents.data.items.forEach((event) => {
      if (!event.start || !event.end) return;

      const startTime = event.start.dateTime || event.start.date;
      const endTime = event.end.dateTime || event.end.date;

      // 🔴 Jeśli wydarzenie jest całodniowe (brak dateTime)
      if (!event.start.dateTime) {
        // blokujemy wszystkie sloty
        allSlots.forEach((slot) => unavailable.add(slot));
        return;
      }

      // 🕒 Normalne wydarzenia godzinowe
      const eventStart = timeToMinutes(startTime.substring(11, 16));
      const eventEnd = timeToMinutes(endTime.substring(11, 16));

      allSlots.forEach((slot) => {
        const slotStart = timeToMinutes(slot);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const slotEnd = slotStart + (serviceDurations[serviceParam] || 0);

        if (eventStart < slotEnd && eventEnd > slotStart) {
          unavailable.add(slot);
        }
      });
    });

    // 3️⃣ Filtrowanie wolnych slotów
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
