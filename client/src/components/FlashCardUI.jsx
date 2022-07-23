import React, {useState, useEffect} from "react";
import CreateCollection from "./CreateCollection";
import Grid from "@mui/material/Grid";
import FlashCard from "./FlashCard";
import CreateFlashCard from "./CreateFlashCard";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Games } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';

function FlashCardUI(props) {
    const [fcCount,setFCCount] = useState(0);
    const [flashCards, setFlashCards] = useState([])
    const [selectedCollection, setSelectedCollection] = useState(props.selectedCollection)
    const [deletedCard, setDeletedCard] = useState("")

    const actions = [
        { icon: <ViewCarouselIcon />, name: 'Review Flashcards' },
        { icon: <DashboardCustomizeIcon />, name: 'Add Flashcard' },
        { icon: <PsychologyIcon/>, name: 'Games'},
        { icon: <EditIcon />, name: 'Edit Flashcards'}
      ];
    
    useEffect(() => {
        if (selectedCollection !== "") {
            fetch("/filterFlashCards", {     
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({"collectionID": selectedCollection}),
                headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
            }).then(function(response){
            return response.json();
            }).then(function(response){
                setFlashCards(response.foundFCs)
                console.log(response.foundFCs);
            }).catch(err => {
                console.log("Error Reading data " + err);
            });
        } 
    },[fcCount]); 

    function flashCardsChanged() {
        setFCCount(fcCount + 1)
    }

    function addFlashCard(collectionInfo) {
        // console.log("Add: " + collectionInfo.name);
        // fetch("/addFlashCard", {     
        //     method: 'POST',
        //     // We convert the React state to JSON and send it as the POST body
        //     body: JSON.stringify({"collection" : selectedCollection, "front" : collectionInfo.name, "back" : collectionInfo.description}),
        //     headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
        // }).then(function(response){
        // return response.json();
        // }).then(function(response){
        //     //setFlashCards(response.foundFCs)
        //     console.log(response);
        // }).catch(err => {
        //     console.log("Error Reading data " + err);
        // });
        console.log("Flashy added")
        flashCardsChanged()
    }
    
    return (
        <div className="body-div">
            <button onClick={props.onClick}>click</button>
            {/* <CreateCollection
                onAdd={addFlashCard}
                inputType={"collection"}
                topPlaceholder={"Card Front Text..."}
                bottomPlaceholder={"Card Back Text..."}
                topName={"cardFront"}
                bottomName={"cardBack"}
                frontRows={3}
                backRows={3}
                collectionClicked={props.collectionClicked}
                selectedCollection={props.selectedCollection} 
            /> */}
            <CreateFlashCard 
                onAdd={flashCardsChanged}
                inputType={"text"}
                selectedCollection={selectedCollection}

            />
        
        <Grid
            container
            //rowSpacing={1}
            spacing={2}
            //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justify="space-evenly"
            alignItems="center"
        >
            {flashCards.map((flashCard) => (
                <Grid item padding={1} xs={4}>
                    <FlashCard
                    key={flashCard._id}
                    id={flashCard._id}
                    front={flashCard.front}
                    back={flashCard.back}
                    collectionID={selectedCollection}
                    onDelete={flashCardsChanged}
                    />
                </Grid>
            ))}
        </Grid>
        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
        
      </div>
    )
}

export default FlashCardUI;