import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CollectionUI from "./UI/CollectionUI";
import FlashCardUI from "./UI/FlashCardUI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import BreadcrumbsUI  from "./UI/BreadcrumbsUI";
import Deck from "./Deck"
import Desk from "./UI/Desk"


function App() {
  const [collectionClicked, setCollectionClicked] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("");
  

  function handleBreadCrumbClick() {}
  
  // function changeView(){  setCollectionClicked(!collectionClicked) }

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
            path="/collections/:collectionID" 
            element={<FlashCardUI />}     
          />

          <Route path="/deck" >
            <Route path=":collectionName" element={<Deck />} />
          </Route>

          <Route 
            path="/deck"  
            element={<Deck />} 
          />

          <Route path="/desk/" >
            <Route path=":collectionName" element={<Desk />} />
          </Route>

          <Route path="*" element={<CollectionUI />}/>

        </Routes>
        </div>
        <Footer />   
    </Router>
  );
}

export default App;
