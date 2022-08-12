import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Zoom, Fab } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


import { set } from 'lodash';
import CreateFlashCard from '../Inputs/CreateFlashCard';

export default function EditFlashCardDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    props.deleteFlashCard()
    setOpen(false)
    console.log("clicky poo");
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Zoom in={true}>
          <Fab color="primary" size="small" aria-label="add" >
            <DeleteOutlinedIcon sx={{color:"primary"}} className="delete-button" /> 
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
          {"Are you sure you want to delete this Flashcard?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Later you can archieve the deleted card */}
          </DialogContentText>

          <CreateFlashCard />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Update</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
