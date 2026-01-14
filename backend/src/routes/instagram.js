const igExpress = require("express");
const igAxios = require("axios");
const igRouter = igExpress.Router();
const pool = require("../../db");

// Replace with your long-lived IG token
const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const USER_ID = process.env.IG_USER_ID;

// GET /api/instagram/fetch
igRouter.get("/fetch", async (req, res) => {
  try {
    // TODO: CREATE A CRON JOB TO REFRESH THE TOKEN EVERY 50 DAYS!
    const url = `https://graph.facebook.com/v18.0/${USER_ID}/media
?fields=id,caption,media_url,media_type,permalink,thumbnail_url,timestamp,children{id,media_type,media_url,thumbnail_url}
&access_token=${ACCESS_TOKEN}`;

    const response = await igAxios.get(url);

    const posts = response.data.data;

    // clear DB
    await pool.query("DELETE FROM instagram");

    // if it's a carousel, maybe take the first child’s media_url
    for (const post of posts) {
      // Try direct media_url
      let mediaUrl = post.media_url || null;

      // If carousel parent, fallback to first child’s media_url
      if (!mediaUrl && post.children && post.children.data.length > 0) {
        mediaUrl = post.children.data[0].media_url || null;
      }

      // As last resort, use thumbnail_url
      if (!mediaUrl) {
        mediaUrl = post.thumbnail_url || null;
      }

      await pool.query(
        `INSERT INTO instagram 
   (ig_id, media_url, media_type, caption, permalink, children, thumbnail_url, timestamp)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
   ON CONFLICT (ig_id) DO UPDATE SET
     media_url = EXCLUDED.media_url,
     media_type = EXCLUDED.media_type,
     caption = EXCLUDED.caption,
     permalink = EXCLUDED.permalink,
     children = EXCLUDED.children,
     thumbnail_url = EXCLUDED.thumbnail_url,
     timestamp = EXCLUDED.timestamp`,
        [
          post.id,
          mediaUrl,
          post.media_type,
          post.caption,
          post.permalink,
          post.children ? JSON.stringify(post.children.data) : null, // 🔥 JSON stringify
          post.thumbnail_url,
          post.timestamp,
        ]
      );
    }

    res.json({ message: "Instagram posts updated", count: posts.length });
  } catch (err) {
    if (err.response) {
      console.error("Instagram API error:", err.response.data);
    } else {
      console.error("Fetch failed:", err.message || err);
    }
    res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
});

igRouter.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM instagram ORDER BY timestamp DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get posts" });
  }
});

module.exports = igRouter;
