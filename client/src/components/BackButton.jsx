import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function BackButton(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIosIcon />}
        onClick={props.onClick}
    >
        Back
      </Button>
    </Stack>
  );
}