import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRouter from "./routes/booking.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/bookings", bookingRouter);

app.get("/api/hello", (_, res) => {
  res.json({ message: "Hello from backend!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
