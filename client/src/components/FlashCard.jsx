import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import styles from "./styles.module.css";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { PropaneSharp } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function FlashCard(props) {
  const [flipped, set] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  // function deleteFlashCard() {
  //   console.log("Flashcard deleted: " + props.id)
  //   const id = props.id
  //   props.onDelete(id)
  // }

  function deleteFlashCard() {
    console.log("FC UI Deleted card ID: " + props.id);
    const flashCard = props.id
    fetch("/deleteFlashCard", {     
        method: 'POST',
        body: JSON.stringify({"collectionID": props.collectionID, "flashCardID": props.id}),
        headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
    }).then(function(response){
    return response.json();
    }).then(function(response){
        console.log(response);
         
        props.onDelete()          
    }).catch(err => {
        console.log("Error Reading data " + err);
    });
    
}

  return (
    <div>
      <div>
        <div className="flash-card note-div">
          <div className="flash" onClick={() => set((state) => !state)}>

            <a.div
              className={`${styles.c} ${styles.front}`}
              style={{
                opacity,
                transform,
                rotateX: "180deg",
                borderRadius: 7
              }}
            >
              <div className="center">
                <h1>{props.front}</h1>
              </div>
            </a.div>
            <a.div
              className={`${styles.c} ${styles.back}`}
              style={{
                opacity: opacity.to((o) => 1 - o),
                transform,
                borderRadius: 7
              }}
            >
              <div className="center">
                <h1>{props.back}</h1>
                <h1>{props.collectionID}</h1>
              </div>
            </a.div>
          </div>
          <DeleteOutlinedIcon className="delete-button" onClick={deleteFlashCard}/>  
        </div>  
      </div>
    </div>
  );
}
