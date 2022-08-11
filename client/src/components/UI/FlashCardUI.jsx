import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import FlashCard from "../FlashCard";
import CreateFlashCard from "../CreateFlashCard";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {useParams, useLocation} from "react-router-dom";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";


function FlashCardUI(props) {
    const { collectionID } = useParams()
    const location = useLocation()
    const name = location.state.collectionName
    const [fcCount,setFCCount] = useState(0);
    const [flashCards, setFlashCards] = useState([])
    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        if (collectionID !== "") {
            fetch("/filterFlashCards", {     
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({"collectionID": collectionID}),
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

    const withLink = (to, children) => <Link to={to}>{children}</Link>;
       {/* // onClick={() => { navigate("/collections/" + collection._id) }} */}
    const actions = [
        { icon: <Link to={"/desk/" + collectionID} state={{flashCards: flashCards, collectionName: name}} ><ViewCarouselIcon /></Link> , name: 'Review Flashcards' },
        { icon: <DashboardCustomizeIcon />, name: 'Add Flashcard' },
        { icon: <EditIcon />, name: 'Edit Flashcards', click: editClicked},
        { icon: <PsychologyIcon/>, name: 'Games'},
    ];

    function flashCardsChanged() {
        setFCCount(fcCount + 1)
    }
    function editClicked() {
        console.log("Clicekddvfadfg");
        setEditMode(!editMode)
        setFCCount(fcCount + 1)
    }

    
    return (
        <div className="body-div">
            {/* <button onClick={props.onClick}>click</button> */}

            <CreateFlashCard 
                onAdd={flashCardsChanged}
                inputType={"text"}
                selectedCollection={collectionID}

            />
            <h1>{name}</h1>
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
                            collectionID={collectionID}
                            onDelete={flashCardsChanged}
                            editMode={editMode}
                        />
                    </Grid>
                ))}
            </Grid>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ 
                    position: 'fixed', bottom: 32, right: 32,
                    '& .MuiFab-primary': { width: 80, height: 80 }
                }}
                icon={<SpeedDialIcon />}
            >
                { actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        sx={{backgroundColor: "red", width: 72, height: 72}}
                        onClick={action.click}
                    />
                )) }
            </SpeedDial>
        
      </div>
    )
}

export default FlashCardUI;