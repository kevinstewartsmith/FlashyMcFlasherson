import React, {useState, useEffect} from "react";
import CreateCollection from "./CreateCollection";
import Grid from "@mui/material/Grid";
import FlashCard from "./FlashCard";
import CreateFlashCard from "./CreateFlashCard";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {useParams} from "react-router-dom";


function FlashCardUI(props) {
    const { collectionName } = useParams()
    const [fcCount,setFCCount] = useState(0);
    const [flashCards, setFlashCards] = useState([])
    const [selectedCollection, setSelectedCollection] = useState(props.selectedCollection)
    const [deletedCard, setDeletedCard] = useState("")
    
    useEffect(() => {
        if (collectionName !== "") {
            fetch("/filterFlashCards", {     
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({"collectionID": collectionName}),
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
    },[fcCount]); 

    function flashCardsChanged() {
        setFCCount(fcCount + 1)
    }

    function addFlashCard(collectionInfo) {
        // console.log("Add: " + collectionInfo.name);
        // fetch("/addFlashCard", {     
        //     method: 'POST',
        //     // We convert the React state to JSON and send it as the POST body
        //     body: JSON.stringify({"collection" : selectedCollection, "front" : collectionInfo.name, "back" : collectionInfo.description}),
        //     headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
        // }).then(function(response){
        // return response.json();
        // }).then(function(response){
        //     //setFlashCards(response.foundFCs)
        //     console.log(response);
        // }).catch(err => {
        //     console.log("Error Reading data " + err);
        // });
        console.log("Flashy added")
        flashCardsChanged()
    }
    
    return (
        <div className="body-div">
            <button onClick={props.onClick}>click</button>

            <CreateFlashCard 
                onAdd={flashCardsChanged}
                inputType={"text"}
                selectedCollection={collectionName}

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
                <Grid item padding={1} xs={4}>
                    <FlashCard
                    key={flashCard._id}
                    id={flashCard._id}
                    front={flashCard.front}
                    back={flashCard.back}
                    collectionID={collectionName}
                    onDelete={flashCardsChanged}
                    />
                </Grid>
            ))}
        </Grid>
        
      </div>
    )
}

export default FlashCardUI;