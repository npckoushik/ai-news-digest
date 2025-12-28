// import express from "express";
// import axios from "axios";
// import Article from "../models/Article.js";
// import summarize from "../utils/summarize.js";

// const router = express.Router();

// router.get("/generate", async (req, res) => {
//   try {
//     const { interest } = req.query;

//     const news = await axios.get(
//       `https://newsapi.org/v2/everything?q=${interest}&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`
//     );

//     const results = [];

//     for (const a of news.data.articles) {
//       const cleanText =
//   a.description ||
//   a.title ||
//   (a.content ? a.content.replace(/<[^>]*>/g, "") : "");

// const summary = await summarize(cleanText);


//       const article = await Article.create({
//         title: a.title,
//         content: a.content || a.description,
//         topic: interest,
//         summary,
//         publishedAt: a.publishedAt
//       });

//       results.push(article);
//     }

//     res.json(results);
//   } catch (err) {
//   console.error("DIGEST ERROR:", err.response?.data || err.message || err);
//   res.status(500).json({ error: "Digest generation failed" });
// }

// });

// export default router;




import express from "express";
import axios from "axios";
import Article from "../models/Article.js";
import summarize from "../utils/summarize.js";

const router = express.Router();

router.get("/generate", async (req, res) => {
  try {
    const { interest } = req.query;

    const news = await axios.get(
      `https://newsapi.org/v2/everything?q=${interest}&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`
    );

    const results = [];

    for (const a of news.data.articles) {
      // CLEAN + PRIORITIZE GOOD TEXT
      const cleanText =
        a.description ||
        a.title ||
        (a.content ? a.content.replace(/<[^>]*>/g, "") : "");

      const summary = await summarize(cleanText);

      const article = await Article.create({
        title: a.title,
        content: cleanText,
        topic: interest,
        summary,
        publishedAt: a.publishedAt
      });

      results.push(article);
    }

    res.json(results);
  } catch (err) {
    console.error("DIGEST ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Digest generation failed" });
  }
});

export default router;
