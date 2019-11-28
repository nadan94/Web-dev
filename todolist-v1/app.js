//jshint esversion:6

//Require installed node modules
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


//Assign express to variable app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = [];
let workItems = [];

//Use ejs
app.set('view engine', 'ejs');

//Get home route
app.get("/", function(req, res){

  let day = date.getDay();

  //Pass value to the ejs placeholder 'listTitle' in the list ejs file
  res.render('list',
   {listTitle: day,
   addListItems: items});

});

//Get work route
app.get("/Work", function(req, res){
  //render the list template
  res.render("list",
  {listTitle: 'Work',
  addListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/", function(req, res){
  let item = req.body.newItem;

  //If the button with a key of 'list' has a value of 'work'
  if(req.body.list === 'Work'){
    workItems.push(item);
    res.redirect("/Work");
  }
  else{
    items.push(item);
    //redirect to the home route
    res.redirect("/");
  }
});

//Create a new server at choen port number
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
