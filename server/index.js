// server/index.js
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser")
const _ = require("lodash")
const mongoose = require("mongoose")

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json())
mongoose.connect("mongodb+srv://Kevinstewartsmith:Flashy@cluster0.kvw7r.mongodb.net/FLASHY-DB")


// mongoose.connection.on('open', function (ref) {
//   console.log('Connected to mongo server.');
//   //trying to get collection names
//   mongoose.connection.db.listCollections().toArray(function (err, names) {
//       console.log(names); // [{ name: 'dbname.myCollection' }]
//       module.exports.Collection = names;
//   });
// })





const PORT = process.env.PORT || 8080;

//Database Schemas and Models
const flashCardSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },

})
const fcCollectionsSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
const FlashCard = mongoose.model("flashcard", flashCardSchema)
const FCCOllections = mongoose.model("fc-collection", fcCollectionsSchema);

//End of Database


FCCOllections.find({}, function(err, foundCollection) {
  if (err) {console.log("SHIT!: " + err)
  } else { 
     //console.log(foundCollection)
     
  }
})
FlashCard.find({}, function(err, foundCards) {
  if (err) {console.log("SHIT!: " + err)
  } else { 
    // console.log(foundCards)
     
  }
})

console.log("Server terminal! ccc")

// Have Node serve the files for our built React app



app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    console.log("homepage!")
});
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
//var jsonParser = bodyParser.json()
app.post("/addCollection", (req, res) => {
  const data = req.body
  res.json({
    status: "success",
    name: data.name,
    description: data.description
  })
  console.log(req.body)


  //res.send("great!")
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});