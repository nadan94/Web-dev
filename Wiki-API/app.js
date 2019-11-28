//jshint esversion:6

//Require NPM modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

//Use express
const app = express();

//Allow view engine to use ejs for templating
app.set('view engine', 'ejs');

//Use body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Use static files
app.use(express.static('public'));

//Setup mongoDB with mongoose
//Connect to the database
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

//Create database schema
const articleSchema = {
  title: String,
  content: String
};

//Create model using the schema
const Article = mongoose.model('Article', articleSchema);


//All articles
// app.route("/articles")
//
// .get(function(req, res){
//   Article.find(function(err, results){
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.send(results);
//     }
//   });
// })
//
// .post(function(req, res){
//   //Create a new article using post request(Postman app)
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//
//   });
//   newArticle.save(function(err){
//     if(!err){
//       res.send("Success");
//     }
//     else {
//       res.send(err);
//     }
//   });
// })
//
// .delete(function(req, res){
//   Article.deleteMany(function(err){
//     if(!err){
//       res.send("Deleted all articles");
//     }
//     else {
//       res.send(err);
//     }
//   });
// });

//Specific articles

app.route("/articles/:articleTitle")

.get(function(req, res){
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle)
  {
    if(foundArticle){
      res.send(foundArticle);
    }
    else{
      res.send("No article found");
    }
  });
})

.put(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {override: true}, function(err){
      if(!err){
        res.send("Successfully updated");
      }
    } );
})

.patch(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Success");
      }
      else{
        res.send("Fail");
      }
    }
  );
})

.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle}, function(err){
      if(!err){
        res.send("Successfully deleted");
      }
      else {
        res.send("Failed to delete");
      }
    });
});

//Create server on localhost 3000
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
