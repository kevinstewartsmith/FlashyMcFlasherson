import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import CollectionUI from "./CollectionUI";
import FlashCardUI from "./FlashCardUI";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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
  function clickBreadCrumb() { }
  return (
    <div>
      <Header />
      <div role="presentation" onClick={clickBreadCrumb}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Collections
        </Link>
        <Typography color="text.primary">Flashcards</Typography>
      </Breadcrumbs>
    </div>
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
