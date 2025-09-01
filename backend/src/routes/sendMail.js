const express = require("express");
const { sendBookingEmails } = require("../services/mailerService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await sendBookingEmails(req.body);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

module.exports = router;
