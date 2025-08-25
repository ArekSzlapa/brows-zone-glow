const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRouter = require("./routes/booking");
const instagramRouter = require("./routes/instagram");
const mailRouter = require("./routes/sendMail");
const reminderService = require("./services/reminderService");
const cron = require("node-cron");
const axios = require("axios");
const path = require("path");

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
const clientPath = path.join(__dirname, "public"); // wskazuje na public_nodejs/public
app.use(express.static(clientPath));

// Catch-all route: wszystko poza /api idzie do Reacta
// Has to stay as "/(.*)/" for express above 5 version
app.get(/(.*)/, (req, res) => {
  if (!req.path.startsWith("/api")) {
    console.log("Catch-all route hit:", req.path);
    res.sendFile(path.join(clientPath, "index.html"));
  } else {
    res.status(404).send("API route not found");
  }
});

// === Cron job co 6 godzin
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
