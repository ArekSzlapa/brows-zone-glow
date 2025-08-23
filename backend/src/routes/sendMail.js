const nodemailer = require("nodemailer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const transpileService = require("../helpers/transpileService");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { email, date, service, name, time, phone } = req.body;

    const templatePath = path.join(__dirname, "../templates/mailtemplate.html");
    let template = fs.readFileSync(templatePath, "utf-8");

    template = template
      .replace("{{name}}", name)
      .replace("{{date}}", date)
      .replace("{{time}}", time)
      .replace("{{service}}", transpileService(service));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Potwierdzenie rezerwacji ${date}`,
      html: template,
    };

    if (process.env.NODE_ENV !== "development") {
      await transporter.sendMail(mailOptions);
    }

    const notificationPath = path.join(
      __dirname,
      "../templates/confirmationTemplate.html"
    );
    let notification = fs.readFileSync(notificationPath, "utf-8");

    notification = notification
      .replaceAll("{{name}}", name)
      .replaceAll("{{date}}", date)
      .replaceAll("{{time}}", time)
      .replaceAll("{{email}}", email)
      .replaceAll("{{phone}}", phone)
      .replaceAll("{{service}}", transpileService(service));

    const notificationOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Potwierdzenie rezerwacji ${date}`,
      html: notification,
    };

    if (process.env.NODE_ENV !== "development") {
      await transporter.sendMail(notificationOptions);
    }

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

module.exports = router;
