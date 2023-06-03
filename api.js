import mongoose from "mongoose";
import express from "express";
import pkg from "body-parser";
const { urlencoded } = pkg;

// Express
const app = express();
app.use(urlencoded);
app.use(express.static("public"));

// Body parser

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

const loadAllArticles = async function () {
  try {
    return await Article.find({});
  } catch (err) {
    console.log(err);
  }
};

const articles = await loadAllArticles();

console.log(articles);

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
