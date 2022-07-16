import React, {useState, useEffect} from "react";
import CreateCollection from "./CreateCollection";
import Grid from "@mui/material/Grid";
import FlashCard from "./FlashCard";



function FlashCardUI(props) {
    const [fcCount,setFCCount] = useState(0);
    const [flashCards, setFlashCards] = useState([])
    const [selectedCollection, setSelectedCollection] = useState(props.selectedCollection)
    useEffect(() => {
        if (selectedCollection !== "") {
            fetch("/filterFlashCards", {     
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({"collectionID": selectedCollection}),
                headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
            }).then(function(response){
            return response.json();
            }).then(function(response){
                setFlashCards(response.foundFCs)
                console.log(response.foundFCs);
            }).catch(err => {
                console.log("Error Reading data " + err);
            });
        } 
    },[]); 

    function flashCardsChanged() {
        setFCCount(fcCount + 1)
    }
    
    return (
        <div className="body-div">
            <button onClick={props.onClick}>click</button>
            <CreateCollection
            onAdd={flashCardsChanged}
            inputType={"collection"}
            topPlaceholder={"Card Front Text..."}
            bottomPlaceholder={"Card Back Text..."}
            topName={"cardFront"}
            bottomName={"cardBack"}
            frontRows={3}
            backRows={3}
            collectionClicked={props.collectionClicked}
            selectedCollection={props.selectedCollection} 
            />
        
        <Grid
            container
            //rowSpacing={1}
            spacing={2}
            //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justify="space-evenly"
            alignItems="center"
        >
            {flashCards.map((flashCard) => (
            <Grid item padding={1} xs={4} spacing={3}>
                <FlashCard
                key={flashCard._id}
                id={flashCard._id}
                front={flashCard.front}
                back={flashCard.back}
                collectionID={selectedCollection}
                />
            </Grid>
            ))}
        </Grid>
      </div>
    )
}

export default FlashCardUI;