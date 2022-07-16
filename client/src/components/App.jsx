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
  
  // useEffect(() => {
  //   //For loading collections
  //   fetch("/getCollections").then(function(response){
  //     return response.json();
  //   }).then(function(response){
  //      setCollectionItems(response)
  //      //console.log(collectionArray.length);
  //   }).catch(err => {
  //     console.log("Error Reading data " + err);
  //   });  
  //   // if (collectionClicked) {
  //   //   filterFlashCards(selectedCollection)
  //   // }

  // },[addItem, deleteCollection]); 
  // //For loading flashcards

  // useEffect(() => {
  //   if (selectedCollection !== "") {
  //     fetch("/filterFlashCards", {
  //       method: 'POST',
  //       // We convert the React state to JSON and send it as the POST body
  //       body: JSON.stringify({"collectionID": selectedCollection}),
  //       headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
  //     }).then(function(response){
  //       return response.json();
  //     }).then(function(response){
  //       setFlashCards(response.foundFCs)
  //       console.log(response.foundFCs);
  //     }).catch(err => {
  //       console.log("Error Reading data " + err);
  //     });
  //  } 
  // },[handleCollectionClick]); 


  // function addItem() {
  //   console.log(collectionArray[0]._id)  
  // }
  // function deleteCollection(collection) {
  //   console.log(collection + " clicked App");
  // }
  function handleCollectionClick(id) {
    setSelectedCollection(id)
    console.log("Handle collection clicked: " + selectedCollection._id);
    changeView()
    // let flashCardFiltered = collectionArray.find(function(collection){
    //   return collection._id === id
    // })
    // console.log(flashCardFiltered.flashCards);
    // setFlashCards(flashCardFiltered.flashCards)
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
