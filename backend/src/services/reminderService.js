const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const pool = require("../../db");
const transpileService = require("../helpers/transpileService");

// ===== Nodemailer transporter =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (booking) => {
  try {
    const {
      client_name: name,
      service,
      reservation_date: date,
      client_phone: phone,
      client_email: email,
      booking_time: time,
    } = booking;

    const reminderMailPath = path.join(
      __dirname,
      "../templates/reminderMail.html"
    );
    let reminderMail = fs.readFileSync(reminderMailPath, "utf-8");

    // Replace placeholders
    reminderMail = reminderMail
      .replace(/{{name}}/g, name)
      .replace(/{{service}}/g, transpileService(service))
      .replace(
        /{{date}}/g,
        new Date(date).toLocaleString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      )
      .replace(/{{phone}}/g, phone)
      .replace(/{{time}}/g, time.slice(0, 5));

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Przypomnienie o wizycie w Brow•Zone`,
      html: reminderMail,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Reminder sent to ${email}`);
  } catch (err) {
    console.error("❌ Error sending reminder:", err);
  }
};

// ===== Helper function =====
async function getUpcomingBookings() {
  console.log("Getting bookings from db");
  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const res = await pool.query(
    `SELECT * FROM booking
     WHERE reservation_date >= $1 AND reservation_date <= $2
     AND reminder = false`,
    [now, next24h]
  );

  return res.rows;
}

// ===== Cron job every hour =====
cron.schedule("0 * * * *", async () => {
  console.log("⌚ Checking for bookings to send reminders...");
  try {
    const bookings = await getUpcomingBookings();

    for (const booking of bookings) {
      await sendReminderEmail(booking);

      // mark reminder as sent
      await pool.query(`UPDATE booking SET reminder = true WHERE id = $1`, [
        booking.id,
      ]);
    }

    console.log(`✅ Sent ${bookings.length} reminder(s)`);
  } catch (err) {
    console.error("❌ Error sending reminders:", err);
  }
});
