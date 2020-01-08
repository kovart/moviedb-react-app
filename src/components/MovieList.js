import React from 'react'
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    item: {
        cursor: 'pointer',
        padding: theme.spacing(1),
        transition: 'all 0.1s cubic-bezier(0.43, 0.57, 0, 0.99)',
        transitionDelay: '0.075s',
        "&:hover": {
            background: 'white',
            zIndex: 2,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '15px 25px !important'
        }
    },
}))

export function MovieList({children}) {
    return (
        <Grid container justify="flex-start" wrap={"wrap"} spacing={2}>
            {children}
        </Grid>
    )
}

export function MovieListItem({children}) {
    const classes = useStyles()

    return (
        <Grid className={classes.item} item xs={12} sm={4} md={2}>
            {children}
        </Grid>
    )

}

export default MovieList
