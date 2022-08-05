import React from "react";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Link } from "react-router-dom";


function Header() {
  return (
    <header>
     <Link to="/" ><h1>Flashy {<FlashOnIcon fontSize="large" />}McFlasherson</h1></Link>
    </header>
  );
}

export default Header;
