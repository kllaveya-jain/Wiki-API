const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
mongoose.set("strictQuery", false);

app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const articleSchema = new mongoose.Schema({
   title: String,
   content: String
});
const Article = mongoose.model("Article", articleSchema);

app.get("/", function(req, res) {
   res.send("Welcome!");
});


app.route("/articles")
   .get(function(req, res) {
      Article.find({}, function(err, foundArticles) {
         if (err) {
            console.log(err);
         }
         else {
            res.send(foundArticles);
         }
      });
   })
   .post(function(req, res) {
      const article = new Article({
         title: req.body.title,
         content: req.body.content
      });
      article.save(function(err) {
         if (err) {
            res.send(err);
         }
         else {
            res.send("Article added successfully!");
         }
      });
   })
   .delete(function(req, res) {
      Article.deleteMany(function(err) {
         if (err) {
            console.log(err);
         }
         else {
            res.send("All the items deleted successfully!");
         }
      })
   });

app.route("/articles/:articleTitle")
   .get(function(req, res){
      Article.findOne({title: req.params.articleTitle}, function (err, foundArticle) {
         if (err) {
            res.send(err);
         }
         else {
            if (foundArticle) {
               res.send(foundArticle);
            }
            else {
               res.send("No articles with matching title were found.");
            }
         }
      });
   })
   .put(function(req, res){
      Article.replaceOne(
         {title: req.params.articleTitle},
         {
            title: req.body.title,
            content: req.body.content
         },
         function (err, response){
            if (err) {
               res.send(err);
            }
            else {
               res.send("Successfully updated the article!");
            }
         });
   })
   .patch(function(req, res){
      Article.updateOne(
         {title: req.params.articleTitle},
         {$set: req.body},
         function(err, result) {
            if (err) {
               res.send(err);
            }
            else {
               res.send("Article updated successfully!");
            }
         });
   })
   .delete(function(req, res){
      Article.deleteOne({title: req.params.articleTitle}, function(err) {
         if (err) {
            res.send(err);
         }
         else {
            res.send("Article deleted successfully!");
         }
      });
   });

app.listen(3000, function () {
   console.log("Server started successfully at port 3000.");
});