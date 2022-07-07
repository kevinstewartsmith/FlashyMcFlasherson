import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import styles from "./styles.module.css";

export default function App() {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  return (
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
              <h1>Front</h1>
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
              <h1>Back</h1>
            </div>
          </a.div>
        </div>
      </div>
    </div>
  );
}
