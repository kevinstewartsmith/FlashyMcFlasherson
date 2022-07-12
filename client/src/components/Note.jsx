import React, { useState } from "react";

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

  return (
    <div>
    <div
      className="note"
      onClick={props.onClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
    >
      <div className="note-div">
        <div className="center">
          <h1>{props.collectionName}</h1>
          <p>{mouseEntered ? props.description +": " + props.id : null}</p>
          
        </div>
        
      </div>
      
    </div>
    <div className="delete-button-container">
    <button className="delete-button" onClick={clickDelete}> Delete</button>
    </div>
    </div>
  );
}

export default Note;
