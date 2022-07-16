import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateCollection from "./CreateCollection";
import FlashCard from "./FlashCard";
import Grid from "@mui/material/Grid";
import CollectionUI from "./CollectionUI";
import FlashCardUI from "./FlashCardUI";

function App() {
  const [collectionArray, setCollectionItems] = useState([]);
  const [collectionClicked, setCollectionClicked] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [flashCards, setFlashCards] = useState([])
  

  function handleCollectionClick(id) {
    setSelectedCollection(id)
    
    changeView()

  }
  
  function changeView(){  setCollectionClicked(!collectionClicked) }
  function addFlashCard() {}
  function filterFlashCards(id) {
    let flashCardsColl = collectionArray.find(function(collection){
      return collection._id === id
    })
    setFlashCards(flashCardsColl.flashCards)
  }
  

  return (
    <div>
      <Header />
      <div className="center-div">

        {!collectionClicked && (
          <div>
            <CollectionUI 
              onClick={handleCollectionClick}
              //onAdd={addItem}
              collectionClicked={collectionClicked}
              selectedCollection={selectedCollection}
            />
          </div>
        )}
        {collectionClicked && (
          <FlashCardUI
            onClick={handleCollectionClick}
            //onAdd={addItem}
            collectionClicked={collectionClicked}
            selectedCollection={selectedCollection}
          />  
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
