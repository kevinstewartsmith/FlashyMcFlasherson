import Deck from "../Cards/Deck"
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import BackButton from "../Buttons/BackButton";

function Desk() {
    const navigate = useNavigate();
    const { collectionName } = useParams()
    const location = useLocation()
    const flashCards = location.state.flashCards
    const name = location.state.collectionName
   
    return (
        <div>
            <BackButton onClick={ () => navigate("/collections/" + collectionName,  { state: { collectionName: name }}) }/>
                {name}
                <div className="desk"> 
                    <div className="deck-container">
                        <Deck
                            flashCards={flashCards}
                            collectionName={collectionName}
                        />
                    </div>
                </div>
        </div>
    );
}

export default Desk