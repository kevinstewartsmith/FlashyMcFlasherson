import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CollectionUI from "./CollectionUI";
import FlashCardUI from "./FlashCardUI";

function App() {
  const [collectionClicked, setCollectionClicked] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  
  function handleCollectionClick(collectionID) {
    console.log("Collection click App: " + collectionID);
    setSelectedCollection(collectionID) 
    changeView()
  }
  function backButtonPressed() {
    setSelectedCollection("") 
    changeView()
  }
  
  function changeView(){  setCollectionClicked(!collectionClicked) }

  return (
    <div>
      <Header />
      <div className="center-div">

        {!collectionClicked && (
          <div>
            <CollectionUI 
              collectionClicked={handleCollectionClick}
              selectedCollection={selectedCollection}
            />
          </div>
        )}
        {collectionClicked && (
          <div>
            <FlashCardUI
              onClick={backButtonPressed}
              collectionClicked={collectionClicked}
              selectedCollection={selectedCollection}
            />  
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
