import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function CreateFlashCard(props) {
  //const [expanded, setExpansion] = useState(false);
  const [flashCardData, setFlashCardData] = useState({ front: "", back: "" });
  const [flashCardHints, setFlashCardHints] = useState({});
  const [selectedCollection, setSelectedCollection] = useState(props.selectedCollection);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen,setErrorOpen] = useState(false);
  
  function handleSuccessOpen() { setSuccessOpen(!successOpen) }
  function handleErrorOpen() { setErrorOpen(!errorOpen) }

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
    if (front !== "" && front !== null && back !=="" && back !=="") {
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
        handleSuccessOpen()
        setFlashCardData({ front: "", back: "" });
        props.onAdd()
    } else {
        handleErrorOpen()
    }
    event.preventDefault();
    
  }

  return (
    <div>
    <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorOpen}    
    >
        <Alert severity="error">Both sides of flashcard must be filled in!</Alert>
    </Snackbar>
    <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessOpen}    
    >
        <Alert severity="success">Flashcard successfully added!</Alert>
    </Snackbar>
        <form className="create-note">
            <textarea
            name={"front"}
            placeholder={"Front text..."}
            //onClick={handleClick}
            onChange={handleInputText}
            type="text"
            value={flashCardData.front}
            />
        <hr/>
       
        <textarea
            name={"back"}
            placeholder={"Back text..."}
            onChange={handleInputText}
            type="text"
            value={flashCardData.back}            
        />
        
        <Fab onClick={addFlashCard}>
            <AddIcon />
        </Fab>
      </form>
    </div>
  );
}
export default CreateFlashCard;
