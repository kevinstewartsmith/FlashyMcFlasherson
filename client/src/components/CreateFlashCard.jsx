import React, { useState } from "react";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Alert from '@mui/material/Alert';

//Center the cards div - check
//Add bread crumbs
//add flashcard data
function CreateFlashCard(props) {
  const [expanded, setExpansion] = useState(false);
  const [flashCardData, setFlashCardData] = useState({ front: "", back: "" });
  const [flashCardHints, setFlashCardHints] = useState({});
  const [selectedCollection, setSelectedCollection] = useState(props.selectedCollection)
  
  function handleClick() {  
    setExpansion(!expanded);
  }

  function handleInputText(event) {
    const { name, value } = event.target;

    setFlashCardData((prevValue) => {
      if (name === "front") {
        return {
          front: value,
          back: prevValue.back
        };
      } else if (name === "back") {
        return {
          front: prevValue.front,
          back: value
        };
      }
    });
  }


  function addFlashCard(event) {
    console.log(flashCardData);
    const front = flashCardData.front
    const back = flashCardData.back
    console.log("Collection: " + selectedCollection);
    console.log("Front: " + front);
    console.log("Back: " + back);
    fetch("/addFlashCard", {     
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({"collection" : selectedCollection, "front" : front, "back" : back}),
        headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
    }).then(function(response){
        return response.json();
    }).then(function(response){
        //setFlashCards(response.foundFCs)
        console.log(response);
    }).catch(err => {
        console.log("Error Reading data " + err);
    });

    setFlashCardData({ front: "", back: "" });
    props.onAdd()
    event.preventDefault();
    
  }

  return (
    <div>
      
      <form className="create-note">
        <textarea
          name={"front"}
          placeholder={"Front text..."}
          onClick={handleClick}
          onChange={handleInputText}
          type="text"
          value={flashCardData.front}
        />
        <hr/>
        {expanded ? (
          <textarea
            name={"back"}
            placeholder={"Back text..."}
            onChange={handleInputText}
            type="text"
            value={flashCardData.back}            
          />
        ) : null}
        

        <Zoom in={expanded}>
          <Fab onClick={addFlashCard}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
export default CreateFlashCard;
