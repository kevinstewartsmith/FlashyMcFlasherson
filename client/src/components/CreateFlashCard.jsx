import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateFlashCard(props) {
    
    const [expanded, setExpansion] = useState(false);
    const [flashCardInfo, setFlashCardInfo] = useState({ name: "", description: "" });

function handleClick() {
    
    setExpansion(!expanded);
}

function handleInputText(event) {
    const { name, value } = event.target;

    setFlashCardInfo((prevValue) => {
        if (name === "title" || name ==="cardFront") {
            return {
                
                name: value,
                description: prevValue.content
            
            };
        } else if (name === "content" || name == "cardBack") {
            return {
                
                name: prevValue.name,
                description: value
            
            };
        }
    });
}


    function submitNote(event) {
    
        const name = flashCardInfo.name
        const description = flashCardInfo.description
        if (collMode === true) {  
            fetch('/addflashCard', {
                
                method: 'POST',
                body: JSON.stringify({"name": name, "description": description}),
                headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
            
            }).then(function(response) {
                
                console.log(response)
                return response.json();
            
            }).then(function(response){ console.log(response) });
        } else {
            console.log("add flash card") 
        }
        
        
        props.onAdd(flashCardInfo);
        setflashCardInfo({ name: "",description: "" });
        event.preventDefault();
    
    }

    return (
        <div>
            
            <form className="create-note">
               
                <input
                name={props.topName}
                placeholder={props.topPlaceholder}
                onClick={handleClick}
                onChange={handleInputText}
                type="text"
                value={flashCardInfo.name}
           
            />

            {expanded ? (
            
            <textarea
                name={props.bottomName}
                onChange={handleInputText}
                value={flashCardInfo.description}
                placeholder={props.bottomPlaceholder}
                //rows={rows}
                type="text"
            />
            
            ) : null}

                <Zoom in={expanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            
            </form>
       
        </div>
  );
}
export default CreateflashCard;
