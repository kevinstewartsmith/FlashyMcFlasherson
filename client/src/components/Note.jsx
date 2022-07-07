import React, { useState } from "react";

function Note(props) {
  const [mouseEntered, setMouseEntered] = useState(false);
  function handleMouse() {
    setMouseEntered(!mouseEntered);
  }

  return (
    <div
      className="note"
      onClick={props.onClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
    >
      <div className="note-div">
        <div className="center">
          <h1>{props.collectionName}</h1>
          <p>{mouseEntered ? props.description : null}</p>
        </div>
      </div>
    </div>
  );
}

export default Note;
