//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

//create new instance of express
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//Get the homescreen
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

//Post to the home page
app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;

  var options = {
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){

    var data = JSON.parse(body);
    var price = data.price;

    console.log(price);

    var date = data.time;


    res.write("<p1>"+date+"</p1>");
    res.write("<h1>" + amount + crypto + " is currently worth " + price + " " + fiat + "</h1>");

    res.send();
  });
});

//Create new server
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
