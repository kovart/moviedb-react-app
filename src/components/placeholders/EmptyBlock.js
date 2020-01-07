import React from 'react'
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    container: {
        "height": 300,
        "background": "#f3f3f3",
        "borderRadius": 4,
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "color": "rgba(0, 0, 0, 0.25)"
    }
}))


function EmptyBlock({text}) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Typography variant="body1">{text}</Typography>
        </div>
    )
}

export default EmptyBlock
