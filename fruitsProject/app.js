//jshint esversion:6

//require mongoose
const mongoose = require("mongoose");

//connect to mongo db server and connect/create the database specified
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//create new schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//create mongoose model("collection name[singular], schema")
const Fruit = mongoose.model("Fruit", fruitSchema);

//create new document model/ i.e create object from the model fruits
const fruit = new Fruit({
  name: "banana",
  rating: 8,
  review: "Best fruit"
});

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 7,
//   review: "Best fruit"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 8,
//   review: "Best fruit"
// });

// Fruit.insertMany([kiwi, orange], function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Success");
//   }
// });

//save new object to collection
//fruit.save();

//Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  //embed fruitSchema document within person schema
  favouriteFruit: fruitSchema
});

//person model
const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "pineapple",
  rating: 10,
  review: "Solid fruit"
});

//pineapple.save();

const naartjie = new Fruit({
  name: "naartjie",
  rating: 6,
  review: "Decent fruit"
});

//naartjie.save();

//create a new person
const person = new Person({
  name: "Amy",
  age: 22,
  favouriteFruit: pineapple
});

//person.save();

//call fruits
// Fruit.find(function(error, fruits){
//   if(error){
//     console.log(error);
//   }
//   else{
//     //console.log(fruits);
//
//     fruits.forEach(function(fruit){
//       console.log(fruit.name);
//     });
//   }
// });

// Person.deleteOne({_id: "5da49f4770097e235cbf6388"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted item");
//   }
// });

Person.updateOne({name: "John"}, {favouriteFruit: naartjie}, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Updated entry");
  }
});
