import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateCollection from "./CreateCollection";
import collections from "./collections";
import FlashCard from "./FlashCard";
import Grid from "@mui/material/Grid";

function App() {
  const [collectionArray, setCollectionItems] = useState(collections);
  const [collectionClicked, setCollectionClicked] = useState(false);

  // function getCollectionData() {
  //   fetch("/getCollections").then(function(response) {
  //     console.log("da json")
  //     console.log(response.json())
  //     console.log("da json")
  //     return response;
  //   });
  // }

  function addItem(collection) {
    setCollectionItems((prevValue) => {
      return [collection, ...prevValue];
    });
    //getCollectionData()
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
                      collectionName={collection.name}
                      description={collection.description}
                      onClick={handleCollectionClick}
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
