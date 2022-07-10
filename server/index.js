// server/index.js
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser")
const _ = require("lodash")
const mongoose = require("mongoose")

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect("mongodb+srv://Kevinstewartsmith:Flashy@cluster0.kvw7r.mongodb.net/FLASHY-DB")

const boot = "booty"
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
  // _id: {
  //   type: String,
  //   required: false
  // },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
})
const FlashCard = mongoose.model("flashcard", flashCardSchema)
const FCCollections = mongoose.model("fc-collection", fcCollectionsSchema);

//End of Database


FCCollections.find({}, function(err, foundCollection) {
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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  console.log("homepage!")
});
app.get("/getCollections", (req, res) => {
  let data = []
  FCCollections.find({},function(err,foundCollections) {
    if (err) {
      console.log(err);
    } else {
      //console.log(foundCollections[0])
      //data = foundCollections
      // foundCollections.forEach(function(collection){
      //   data.push(collection)
      // })
      data = foundCollections
      res.send(data)
    }
  }) 

  //console.log(req);
  //res.send(data.length)
  //res.send({"message": data})
  
  //res.json({"message": "Getttttt"})
})

app.post("/addCollection", (req, res) => {
  const data = req.body

  const newCollection = new FCCollections({
    name: data.name,
    description: data.description
  })

  newCollection.save()

  res.json({
    status: "success",
    name: data.name,
    description: data.description
  })

})

app.post("/deleteCollection", (req, res) => {
  const collectionId = req.body.id
  FCCollections.deleteOne({_id: collectionId}, function(err, foundCollection) {
    if (err) {
      console.log(err);
    } else {
      console.log(collectionId);
      
      res.json({
        status: "Successful delete",
        id: collectionId
      
       })
    }
  })

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

  // FCCollections.find({},function(err,foundCollections) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(foundCollections)
  //   }
  // }) 