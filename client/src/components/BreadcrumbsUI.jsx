import React from "react"
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { transform } from "lodash";

function BreadcrumbsUI(props) {
    // const {
    //     history,
    //     location: [ pathname ]
    // } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter(Boolean)
    console.log("pathnames: " + pathnames);
    console.log("Naviget: " + navigate);
    return (
        <div className="breadcrumbs">
            <Breadcrumbs aria-label="breadcrumb" separator={<FlashOnIcon sx={{color: "red"}} fontSize="small"/>} color="white" >
                {pathnames.length ? (
                    <Link onClick={() => navigate("/")}><h1>Collections</h1></Link>
                ) : (
                    <Typography><h1>Collections</h1></Typography>
                )}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                    <Typography key={name}><h1>{name}</h1></Typography>
                    ) : (
                    <Link key={name} onClick={() => navigate(routeTo)}>
                       <h1>{name}</h1>
                    </Link>
                    );
                })}
            </Breadcrumbs>
        </div>
    )
}

export default BreadcrumbsUI;