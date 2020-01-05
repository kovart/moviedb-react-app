import {makeStyles} from "@material-ui/core/styles"
import {Star as StarIcon} from '@material-ui/icons'
import React from "react"
import {Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import {getScoreColor} from "./utils/score-color"

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxShadow: "none",
        textDecoration: 'none',
        color: 'inherit'
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


function MovieCard({id, name, overview, genres, voteAverage, date, posterImageUrl}) {
    const classes = useStyles()

    const color = getScoreColor(voteAverage)

    const vote = voteAverage > 0 ? voteAverage : '-'

    return (
        <Link className={classes.root} to={"/movie/"+id}>
            <img className={classes.image} src={posterImageUrl} alt={name}/>
            <div className={classes.details}>
                <Typography variant={"h3"} className={classes.movieName}>{name}</Typography>
                <div className={classes.rate} style={{backgroundColor: color}}>
                    <StarIcon className={classes.star}/>
                    {vote}
                </div>
                <div className={classes.extraInfo}>
                    {new Date(date).getFullYear()} • {genres.length ? genres.slice(0, 3).join(', '): '-'}
                </div>
            </div>
        </Link>
    )
}

export default MovieCard
