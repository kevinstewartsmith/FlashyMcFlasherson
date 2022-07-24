import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Alert from '@mui/material/Alert';


function CreateCollection(props) {
  const [expanded, setExpansion] = useState(false);
  const [collectionData, setCollectionData] = useState({ name: "", description: "" });
  
  function handleClick() {  
    setExpansion(!expanded);
  }

  function handleInputText(event) {
    const { name, value } = event.target;

    setCollectionData((prevValue) => {
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
    const name = collectionData.name
    const description = collectionData.description
      fetch('/addCollection', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({"name": name, "description": description}),
        headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
      }).then(function(response) {
        console.log(response)
        return response.json();
      }).then(function(response){ console.log(response) });
      props.onAdd();
      console.log("Add some shit");      
      setCollectionData({ name: "",description: "" });
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
          value={collectionData.name}
        />
        {expanded ? (
          <textarea
            name={props.bottomName}
            onChange={handleInputText}
            value={collectionData.description}
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
export default CreateCollection;
