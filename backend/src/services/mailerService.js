const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const transpileService = require("../helpers/transpileService");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBookingEmails({
  email,
  date,
  time,
  name,
  phone,
  service,
  isFromCalendar,
}) {
  // Customer email
  let template = fs.readFileSync(
    path.join(__dirname, "../templates/mailtemplate.html"),
    "utf-8"
  );

  template = template
    .replace("{{name}}", name)
    .replace("{{date}}", date)
    .replace("{{time}}", time)
    .replace(
      "{{service}}",
      isFromCalendar ? service : transpileService(service)
    );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Potwierdzenie rezerwacji ${date}`,
    html: template,
  };

  // Company notification email
  let notification = fs.readFileSync(
    path.join(__dirname, "../templates/confirmationTemplate.html"),
    "utf-8"
  );
  notification = notification
    .replaceAll("{{name}}", name)
    .replaceAll("{{date}}", date)
    .replaceAll("{{time}}", time)
    .replaceAll("{{email}}", email)
    .replaceAll("{{phone}}", phone)
    .replaceAll(
      "{{service}}",
      isFromCalendar ? service : transpileService(service)
    );

  const notificationOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Potwierdzenie rezerwacji ${date}`,
    html: notification,
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(notificationOptions);
}

module.exports = { sendBookingEmails };
