import Deck from "./Deck"
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Fab } from "@mui/material";
import BackButton from "./BackButton";

function Desk() {
    const navigate = useNavigate();
    const { collectionName } = useParams()
    const location = useLocation()
    console.log("State:");
    console.log(location.state.flashCards);
    const flashCards = location.state.flashCards
    const name = location.state.collectionName
    //{ navigate("/collections/" + collection._id,  { state: { collectionName: collection.name }}) }
    return (
        <div>
             
             <BackButton onClick={ () => navigate("/collections/" + collectionName,  { state: { collectionName: name }}) }/>
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