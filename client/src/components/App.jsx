import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CollectionUI from "./CollectionUI";
import FlashCardUI from "./FlashCardUI";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import FlashCard from "./FlashCard";

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
    <Router>
      
        <Header />
        <div className="center-div">
        <Routes>
          <Route path="/" element={<CollectionUI />} />
          <Route path="/collections/:collectionName" 
            element={<FlashCardUI />} />
          <Route path="/flashcard"  element={<Test />} />
        </Routes>
        </div>
        <Footer />
      
    </Router>
  );
}
const Test = () => (
  <div>
    <h1>Test</h1>
  </div>
)
export default App;
