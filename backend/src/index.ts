/* eslint-disable @typescript-eslint/no-require-imports */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRouter = require("./routes/booking");
const path = require("path");
const instagramRouter = require("./routes/instagram");
const cron = require("node-cron");
const axios = require("axios");

const BACKEND_URL = process.env.BACKEND_URL;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === API routes ===
app.use("/api/bookings", bookingRouter);
app.use("/api/instagram", instagramRouter);

// === Static frontend ===
const clientPath = path.join(__dirname, "../dist-client");
app.use(express.static(clientPath));

// Wszystkie inne trasy kierujemy do Reacta
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

async function fetchInstagram() {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/instagram/fetch`);
    console.log("Fetched Instagram posts:", res.data);
  } catch (err) {
    console.error("Failed to fetch IG posts:", err);
  }
}

// 1️⃣ Run immediately on app start
fetchInstagram();

// 2️⃣ Schedule cron job to run every 6 hours
// This uses node-cron's syntax: minute hour day month weekday
// "0 */6 * * *" → at minute 0 of every 6th hour
cron.schedule("0 */6 * * *", () => {
  console.log("Running scheduled Instagram fetch...");
  fetchInstagram();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
