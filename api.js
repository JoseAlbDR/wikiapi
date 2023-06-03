import mongoose from "mongoose";
import express from "express";
import pkg from "body-parser";
const { urlencoded } = pkg;

// Express
const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// DB
const dbConnect = async function () {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
    console.log("Connected to wikiDB.");
  } catch (err) {
    console.log(err);
  }
};

dbConnect();

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

// Get endpoints
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.send(articles);
  } catch (err) {
    res.send(err.message);
    console.err(err);
  }
});

app.get("/articles/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const article = await Article.findOne({ title: title });
    if (!article) throw new Error(`Article with title: ${title} not found.`);
    res.send(article);
  } catch (err) {
    res.send(err.message);
    console.error(err);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome.");
});

// Post endpoints
// Add a new article
app.post("/articles", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await article.save();
    res.send(`Article with title: ${title} succesfully added.`);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

// Delete all articles
app.delete("/articles", async (req, res) => {
  try {
    await Article.deleteMany({});
    res.send("All articles succesfully deleted.");
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
