import {makeStyles} from "@material-ui/core/styles"
import {Star as StarIcon} from '@material-ui/icons'
import React from "react"
import {Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxShadow: "none",
    },
    image: {
        display: 'block',
        width: "100%",
        minHeight: 250,
        borderRadius: "4px",
        backgroundColor: '#e8e8e8',
    },
    details: {
        padding: '4px 4px'
    },
    movieName: {
        fontSize: "1.1rem",
        fontWeight: "normal",
        margin: "4px 0 8px 0",
        lineHeight: '140%'
    },
    rate: {
        display: 'inline-flex',
        position: 'absolute',
        left: -8,
        top: 8,
        fontWeight: 'bold',
        fontFamily: 'Helvetica, sans-serif',
        padding: '3px 8px',
        fontSize: '10pt',
        color: 'white',
        background: '#83d620',
        borderRadius: 4,
    },
    star: {
        display: 'block',
        width: 18,
        height: 18,
        fill: '#00000047',
        marginRight: 4
    },
    extraInfo: {
        fontSize: '11pt',
        color: 'grey',
        lineHeight: '150%'
    }
}))

const voteColors = {
    BAD: '#d63737',
    OK: '#e2b31e',
    GOOD: '#b6d645',
    EXCELLENT: '#83d620'
}

function MovieCard({name, overview, genres, voteAverage, date, posterImageUrl}) {
    const classes = useStyles()

    let voteColor = voteColors.EXCELLENT
    if(voteAverage < 5.5) voteColor = voteColors.BAD
    else if(voteAverage < 7) voteColor = voteColors.OK
    else if(voteAverage < 8) voteColor = voteColors.GOOD

    return (
        <div className={classes.root}>
            <img className={classes.image} src={posterImageUrl} alt={name}/>
            <div className={classes.details}>
                <Typography variant={"h3"} className={classes.movieName}>{name}</Typography>
                <div className={classes.rate} style={{backgroundColor: voteColor}}>
                    <StarIcon className={classes.star}/>
                    {voteAverage}
                </div>
                <div className={classes.extraInfo}>
                    {new Date(date).getFullYear()} • {genres.slice(0, 3).join(', ')}
                </div>
            </div>
        </div>
    )
}

export default MovieCard
