const express = require("express");
const { Pool } = require("pg");
const axios = require("axios");
const router = express.Router();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
});

// Replace with your long-lived IG token
const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const USER_ID = process.env.IG_USER_ID;

// GET /api/instagram/fetch
router.get("/fetch", async (req, res) => {
  try {
    const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${ACCESS_TOKEN}`;
    console.log("w url");
    const response = await axios.get(url);

    const posts = response.data.data;

    for (const post of posts) {
      await pool.query(
        `INSERT INTO instagram_posts (ig_id, media_url, caption, permalink, timestamp)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (ig_id) DO NOTHING`,
        [post.id, post.media_url, post.caption, post.permalink, post.timestamp]
      );
    }

    res.json({ message: "Instagram posts updated", count: posts.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM instagram_posts ORDER BY timestamp DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get posts" });
  }
});

module.exports = router;
