import Deck from "./Deck"
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";



function Desk() {
    const { collectionName } = useParams()
    const location = useLocation()
    console.log("State:");
    console.log(location.state.flashCards);
    const flashCards = location.state.flashCards

    return (
        <div className="desk"> 
            <div className="deck-container">
                <Deck
                    flashCards={flashCards}
                    collectionName={collectionName}
                />
            </div>
        </div>
    );
}

export default Desk