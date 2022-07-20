import React, {useState, useEffect} from "react";
import CreateCollection from "./CreateCollection";
import Grid from "@mui/material/Grid";
import Note from "./Note";

function CollectionUI (props) {
    const [collectionArray,setCollectionItems] = useState([]);
    const [selectedCollection,setSelectedCollection] = useState(false);
    const [collectionCount,setCollectionCount] = useState(0);
    
    useEffect(() => {
        //For loading collections
        fetch("/getCollections").then(function(response){
          return response.json();
        }).then(function(response){
          setCollectionItems(response)
          console.log(collectionArray.length);
        }).catch(err => {
          console.log("Error Reading data " + err);
        });  
      },[collectionCount]); 

    function collectionClicked(collectionID) {
        console.log("Collection Clicked Collection UI");
        console.log("id:" + collectionID);
        props.collectionClicked(collectionID)
    }
    function collectionChanged(){
        setCollectionCount(collectionCount + 1)
    }

    return (
        <div>
            <CreateCollection
                onAdd={collectionChanged}
                inputType={"collection"}
                topPlaceholder={"Add Collection"}
                bottomPlaceholder={"Description (optional)"}
                topName={"title"}
                bottomName={"content"}
                selectedCollection={selectedCollection}
                //selectedCollection={props.selectedCollection} 
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
                            <Grid item padding={1} xs={4} >
                                <Note
                                    key={collection._id}
                                    id={collection._id}
                                    collectionName={collection.name}
                                    description={collection.description}
                                    onClick={collectionClicked}
                                    onDelete={collectionChanged}
                                />
                            </Grid>
                        ))}
                    </Grid>
            </div>
        </div>
    )
}

export default CollectionUI;