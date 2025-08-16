/* eslint-disable @typescript-eslint/no-require-imports */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRouter = require("./routes/booking");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === API routes ===
app.use("/api/bookings", bookingRouter);

// === Static frontend ===
const clientPath = path.join(__dirname, "../dist-client");
app.use(express.static(clientPath));

// Wszystkie inne trasy kierujemy do Reacta
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
