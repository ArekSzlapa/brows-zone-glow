const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRouter = require("./routes/booking");
const path = require("path");
const instagramRouter = require("./routes/instagram");
const cron = require("node-cron");
const axios = require("axios");
const mailRouter = require("./routes/sendMail");
const reminderService = require("./services/reminderService");

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;
console.log("BACKEND_URL =", BACKEND_URL);

const app = express();
app.use(cors());
app.use(express.json());

// === API routes ===
app.use("/api/bookings", bookingRouter);
app.use("/api/send-mail", mailRouter);
app.use("/api/instagram", instagramRouter);

async function fetchInstagram() {
  try {
    console.log("Calling:", `${BACKEND_URL}/api/instagram/fetch`);
    const res = await axios.get(`${BACKEND_URL}/api/instagram/fetch`);
    console.log("Fetched Instagram posts:", res.data);
  } catch (err) {
    console.error("Failed to fetch IG posts:", err);
  }
}

// === Static frontend ===
const clientPath = path.join(__dirname, "../dist");
app.use(express.static(clientPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// 2️⃣ Schedule cron job to run every 6 hours
// This uses node-cron's syntax: minute hour day month weekday
// "0 */6 * * *" → at minute 0 of every 6th hour
cron.schedule("0 */6 * * *", () => {
  console.log("Running scheduled Instagram fetch...");
  fetchInstagram();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  if (process.env.NODE_ENV !== "development") {
    fetchInstagram();
  }
});
