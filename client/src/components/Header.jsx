import React from "react";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()
  return (
    <header>
      <div  onClick={() => { navigate("/") }}><h1>Flashy<div className="lightning"><FlashOnIcon fontSize="56rem"/></div>McFlasherson</h1></div>
    </header>
  );
}

export default Header;
