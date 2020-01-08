import React from 'react'
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import FavoriteIcon from '@material-ui/icons/Favorite'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import {Menu as MenuIcon} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    list: {
        width: 250
    },
    brand: {
        textDecoration: 'none',
        color: 'inherit'
    },
}))

function Sidebar({open, onClose}) {
    const classes = useStyles()

    return (
        <Drawer anchor="left" variant="temporary" open={open} onClose={onClose}>
            <List className={classes.list}>
                <ListItem button key="favorite">
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link className={classes.brand} to="/">Cinema App</Link>
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem component={Link} to="/favorites" button key="favorite">
                    <ListItemIcon><FavoriteIcon/></ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItem>
                <ListItem component={Link} to="/visited" button key="visited">
                    <ListItemIcon><VisibilityIcon/></ListItemIcon>
                    <ListItemText primary="Visited" />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar
