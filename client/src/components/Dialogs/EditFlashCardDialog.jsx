import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Zoom, Fab } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Form from '../Inputs/Form';
import EditIcon from '@mui/icons-material/Edit';


import { set } from 'lodash';
import CreateFlashCard from '../Inputs/CreateFlashCard';

export default function EditFlashCardDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [flashCardData, setFlashCardData] = React.useState({front:"", back:""})
  const handleClickOpen = () => {
    setOpen(true);
  };
  let updateClickCount = 0;

  React.useEffect(() => {
    console.log("Data come yo");
    console.log(flashCardData);
    

  }); 
  //,[updateClickCount]
    
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
   
    
    setOpen(false)
    // console.log("update!");
    // console.log(flashCardData);
  };
  const handleFlashcardData = (data) => {
    //setFlashCardData(data)
    //console.log(data);
    
    setFlashCardData(data)
    props.handleFlashcardData(data)
    //console.log(flashCardData);
    //updateClickCount++
    //handleUpdate()
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Zoom in={true}>
          <Fab color="primary" size="small" aria-label="add" >
            <EditIcon sx={{color:"primary"}} className="delete-button" /> 
          </Fab>
        </Zoom>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to update this Flashcard?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Later you can archieve the deleted card */}
          </DialogContentText>

          {flashCardData.front}
          <Form 
            front={props.front}
            back={props.back}
            handleFlashcardData={handleFlashcardData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
