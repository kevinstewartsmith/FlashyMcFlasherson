import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function Form(props) {
      //const [expanded, setExpansion] = useState(false);
  const [flashCardData, setFlashCardData] = useState({ front: props.front, back: props.back });
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
    //sendData()
    //props.handleFlashCardData(flashCardData)
    //console.log(flashCardData);
  }
  function sendData() {
    
  }
  useEffect(() => {
    props.handleFlashcardData(flashCardData)
    // console.log("Data come");
    // console.log(flashCardData);
   });

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
            //placeholder={props.front}
            //onClick={handleClick}
            onChange={handleInputText}
            type="text"
            value={flashCardData.front}
            />
        <hr/>
       
        <textarea
            name={"back"}
            //placeholder={props.back}
            onChange={handleInputText}
            type="text"
            value={flashCardData.back}            
        />
        

      </form>
    </div>
  );
}

export default Form;