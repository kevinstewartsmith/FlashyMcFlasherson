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
  useEffect(() => {
    //const dataArray = []
    fetch("/getCollections",  {
      headers: {
      //"Content-Type": "application/json"
      }
    }).then(function(response){
      
      return response.json();
    }).then(function(response){
       //console.log(typeof response[0]._id) 
       setCollectionItems(response)
       console.log(collectionArray.length);
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });;
    //setCollectionItems(dataArray)
    //return dataArray
    //console.log(dataArray);
  },[addItem, deleteCollection])
  
  function addItem(collection) {
    console.log(collectionArray[0]._id)
    // setCollectionItems((prevValue) => {
    //   return [collection, ...prevValue];
    // });
    //setCollectionItems(collectionArray)
    //getCollectionData()
  }
  function deleteCollection(collection) {
    console.log(collection + " clicked App");
  }
  function handleCollectionClick() {
    setCollectionClicked(!collectionClicked);
  }

  function addFlashCard() {}

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
            />
            {/*<div className="body-div">
              {collectionArray.map((collection) => (
                <Note
                  collectionName={collection.name}
                  description={collection.description}
                  onClick={handleCollectionClick}
                />
              ))}
              </div>*/}
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
            />
            {/*<FlashCard />
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
            <FlashCard />*/}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
