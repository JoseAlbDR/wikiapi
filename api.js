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
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  const load = async function () {
    try {
      const articles = await Article.find({});
      res.send(articles);
    } catch (err) {
      res.send(err.message);
      console.err(err);
    }
  };
  load();
});

app.get("/articles/:title", (req, res) => {
  const loadOne = async function (title) {
    try {
      console.log(title);

      const article = await Article.findOne({ title: title });
      console.log(article);
      if (!article) throw new Error(`Article with title: ${title} not found.`);

      res.send(article);
    } catch (err) {
      res.send(err.message);
      console.error(err);
    }
  };
  loadOne(req.params.title);
});

app.get("/", (req, res) => {
  res.send("Welcome.");
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
