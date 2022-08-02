import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CollectionUI from "./CollectionUI";
import FlashCardUI from "./FlashCardUI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import BreadcrumbsUI  from "./BreadcrumbsUI";
import Deck from "./Deck"


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
  function handleBreadCrumbClick() {}
  
  function changeView(){  setCollectionClicked(!collectionClicked) }

  return (
    <Router>
      
        <Header />
        <div className="center-div">
        
        <div role="presentation" onClick={handleBreadCrumbClick}>
        <BreadcrumbsUI/>
        </div>

        <Routes>

          <Route 
            path="/" 
            element={<CollectionUI />} 

          />
          
          <Route 
            path="/collections/:collectionName" 
            element={<FlashCardUI />}     
          />
          
          <Route path="/deck" >
            <Route path=":collectionName" element={<Deck />} />
          </Route>

          <Route 
            path="/deck"  
            element={<Deck />} 
          />


          <Route path="*" element={<CollectionUI />}/>

        </Routes>
        </div>
        <Footer />
      
    </Router>
  );
}

export default App;
