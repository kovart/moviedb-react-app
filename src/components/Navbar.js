import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import {Menu as MenuIcon} from "@material-ui/icons"
import React from "react"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    menu: {
        marginRight: 10
    },
    brand: {
        textDecoration: 'none',
        color: 'inherit'
    }
}))

function Navbar(props) {
    const classes = useStyles()

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menu}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap >
                    <Link to="/" className={classes.brand}>Cinema App</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
