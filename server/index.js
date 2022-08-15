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
const PORT = process.env.PORT || 8080;


//Database Schemas and Models
const flashCardSchema = mongoose.Schema({
  
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
  },
  flashCards: {
    type: [flashCardSchema],
    required: true
  }
})
const FlashCard = mongoose.model("flashcard", flashCardSchema)
const FCCollections = mongoose.model("fc-collection", fcCollectionsSchema);

//End of Database

FCCollections.find({}, function(err, foundCollection) {
  if (err) {console.log(err)
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
      data = foundCollections
      res.send(data)
    }
  }) 
});

  app.post("/filterFlashCards", (req,res) => {
    let collectionID = req.body.collectionID
    let data = []
    let flashCards = []
    FCCollections.findOne({_id: collectionID}, function(err, foundFCs){
      if (err) {
        console.log(err);
      } else {
        //console.log(foundFCs);
        res.json({
          status: "success",
          collectionId: collectionID,
          foundFCs: foundFCs.flashCards 
        })
      }
    })
    //console.log(req.body);

  });


app.post("/addCollection", (req, res) => {
  const data = req.body
  
  const newCollection = new FCCollections({
    name: data.name,
    description: data.description,
    flashCards: []
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
app.post("/addFlashCard", (req, res) => {
  const data = req.body
  const front = req.body.front;
  const back = req.body.back;
  const collection = req.body.collection;
  if (front !== "" && front !== null && back !=="" && back !=="") {
    FCCollections.findOneAndUpdate( {_id : collection} ,
    {
      $push: { flashCards: { front: front, back: back }}
      //{$push: {friends: {firstName: "Harry", lastName: "Potter"}}}
    },
    function(err, doc){
      if (err) {
        console.log(err)
      } else {
        res.json({added: "Success!"})
      }
      
    })
  } else {
    res.json({added: "Flashcards must have content in both fields!"})
  }

})

app.post("/deleteFlashCard", (req, res) => {
  console.log(req.body.flashCardID);
  const flashCardID = req.body.flashCardID;
  const collectionID = req.body.collectionID
  
  FCCollections.findOneAndUpdate( {'flashCards._id' : flashCardID} ,
  {
    $pull: { flashCards: { _id: flashCardID }}
  },
  function(err, doc){
    if (err) {
      console.log(err)
    } else {
      console.log(doc);
      res.json({deleted: flashCardID})
    }
     
  })


  
})
// app.get("/collections/:collectionName", function(req, res) {

// })

app.post("/updateFlashCard", (req, res) => {
  console.log(req.body.flashCardID);
  console.log("update card from server");
  const flashCardID = req.body.flashCardID;
  const front = req.body.front
  const back = req.body.back
  
  FCCollections.findOneAndUpdate( {'flashCards._id' : flashCardID} ,
  {
    front: front,
    back: back
  },
  function(err, doc){
    if (err) {
      console.log(err)
    } else {
      console.log(doc);
      res.json({updated: flashCardID})
    }
     
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

  // FCCollections.findOne({_id: "62cfa26eebbf22bab9ff60c1"},function(err,foundCollection) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(foundCollection)
  //     const flashCard =  new FlashCard({
  //         front: "Faart Fart Fart",
  //         back: "Yoo444"
  //     })
  //     flashCard.save()
      
  //     foundCollection.flashCards.push(flashCard);
  //     foundCollection.save()
  //     console.log(foundCollection)
      

  //   }
  // }) 