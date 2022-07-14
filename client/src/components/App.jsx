import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateCollection from "./CreateCollection";
import collections from "./collections";
import FlashCard from "./FlashCard";
import Grid from "@mui/material/Grid";

function App() {
  const [collectionArray, setCollectionItems] = useState([]);
  const [collectionClicked, setCollectionClicked] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [flashCards, setFlashCards] = useState([])
  useEffect(() => {
    
    fetch("/getCollections",  {
      headers: {
      //"Content-Type": "application/json"
      }
    }).then(function(response){
      
      return response.json();
    }).then(function(response){
       
       setCollectionItems(response)
       console.log(collectionArray.length);
    }).catch(err => {
      
      console.log("Error Reading data " + err);
    });;
    
  },[addItem, deleteCollection]);

  
  
  function addItem(collection) {
    console.log(collectionArray[0]._id)  
  }
  function deleteCollection(collection) {
    console.log(collection + " clicked App");
  }
  function handleCollectionClick(id) {
    setCollectionClicked(!collectionClicked);
    console.log("Collection clicked");
    console.log("App: " + id);
    setSelectedCollection(id);
    const flashCards = collectionArray.filter((collectionItem) => collectionItem._id === selectedCollection)
    console.log(flashCards);

  }

  function addFlashCard(flashCard) {

  }

  return (
    <div>
      <Header />
      <div className="center-div">

        {!collectionClicked && (
          <div>
            <CreateCollection
              onAdd={addItem}
              inputType={"collection"}
              topPlaceholder={"Add Collection"}
              bottomPlaceholder={"Description (optional)"}
              topName={"title"}
              bottomName={"content"}
              collectionClicked={collectionClicked}
              
            />

            <div>
              <Grid
                container
                //rowSpacing={1}
                spacing={2}
                //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justify="space-evenly"
                alignItems="center"
              >
                {collectionArray.map((collection) => (
                  <Grid item padding={1} xs={4} spacing={3}>
                    <Note
                      key={collection._id}
                      id={collection._id}
                      collectionName={collection.name}
                      description={collection.description}
                      onClick={handleCollectionClick}
                      onDelete={deleteCollection}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        )}
        {collectionClicked && (
          <div className="body-div">
            <button onClick={handleCollectionClick}>click</button>
            <CreateCollection
              onAdd={addFlashCard}
              inputType={"collection"}
              topPlaceholder={"Card Front Text..."}
              bottomPlaceholder={"Card Back Text..."}
              topName={"cardFront"}
              bottomName={"cardBack"}
              frontRows={3}
              backRows={3}
              collectionClicked={collectionClicked}
              //selectedCollection={selectedCollection}
              
            />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
            <FlashCard />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
