import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import {Menu as MenuIcon} from "@material-ui/icons"
import React from "react"
import Typography from "@material-ui/core/Typography"

function Navbar(props) {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap>
                    Cinema App
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
