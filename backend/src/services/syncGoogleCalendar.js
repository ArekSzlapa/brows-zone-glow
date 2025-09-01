const https = require("https");
const http = require("http");
const cron = require("node-cron");

const BACKEND_URL = process.env.BACKEND_URL;

function callSync() {
  const url = `${BACKEND_URL}/api/bookings/sync-google-events`;
  const data = JSON.stringify({ date: null });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(url, options, (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      console.log("Response:", body);
    });
  });

  req.on("error", (err) => {
    console.error("Error:", err);
  });

  req.write(data);
  req.end();
}

// Cron everyhour
cron.schedule("0 */1 * * *", () => {
  console.log("⌚ Checking for events to be synced...");
  try {
    callSync();

    console.log(`✅ google events synced`);
  } catch (err) {
    console.error("❌ Error syncing google events:", err);
  }
});

callSync();
