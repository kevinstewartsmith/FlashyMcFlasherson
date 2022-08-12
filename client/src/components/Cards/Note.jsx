import React, { useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Zoom from "@mui/material/Zoom";

function Note(props) {
  const [mouseEntered, setMouseEntered] = useState(false);
  function handleMouse() {
    setMouseEntered(!mouseEntered);
  }

  function clickDelete(event){
    const id = props.id
    fetch('/deleteCollection', {
      method: 'POST',
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify({"id": id}),
      headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{

    }).then(function(response) {
      //console.log(response)
      return response.json();
    }).then(function(response){ console.log(response) });
    //const array = getCollectionData()
    
    props.onDelete(props.id)
    event.preventDefault();
  }
  function handleClick() {
    const id = props.id
    props.onClick(id)
  }

  return (
    <div>
    <div
      className="note"
      onClick={handleClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
    >
      <div className="note-div">
        <div className="center">
          <h1>{props.collectionName}</h1>
          <p>{mouseEntered ? props.description  : null}</p>
          
        </div>
        
      </div>
      
    </div>
    
    <div className="delete-button-container">
      {/* <button className="delete-button" onClick={clickDelete}> <DeleteOutlinedIcon /></button> */}
      
      {/* <DeleteOutlinedIcon className="delete-button" onClick={clickDelete}/> */}
    
    </div>
    
    </div>
  );
}

export default Note;
