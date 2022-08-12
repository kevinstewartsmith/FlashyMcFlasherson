import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import styles from "../styles.module.css";
import {useParams} from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { PropaneSharp } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function DeckCard(props) {
  const [flipped, set] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });



  return (
    <div>
      <div>
        <div className="deck-card note-div">
          <div className="flash" onClick={() => set((state) => !state)}>

            <a.div
              className={`${styles.d} ${styles.front}`}
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
              className={`${styles.d} ${styles.back}`}
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
          
        </div>  
      </div>
    </div>
  );
}
