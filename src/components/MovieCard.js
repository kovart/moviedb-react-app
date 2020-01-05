import {makeStyles} from "@material-ui/core/styles"
import React from "react"
import {Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import {getScoreColor} from "./utils/score-color"

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxShadow: "none",
        textDecoration: 'none',
        color: 'inherit',
        "&:hover": {
            "& $posterImage":{
                transform: 'scale(1.075)'
            }
        }
    },
    posterContainer: {
        position: 'relative',
        overflow: 'hidden'
    },
    posterImage: {
        position: 'relative',
        display: 'block',
        width: "100%",
        minHeight: 250,
        borderRadius: "4px",
        backgroundColor: '#e8e8e8',
        transition: 'all 0.15s ease-in-out'
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
        left: -5,
        top: 8,
        justifyContent: 'center',
        fontWeight: 'bold',
        padding: '2px 8px',
        minWidth: 30,
        fontSize: '10pt',
        color: 'white',
        background: '#83d620',
        borderRadius: 2,
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
            <div className={classes.posterContainer}>
                <img className={classes.posterImage} src={posterImageUrl} alt={name}/>
            </div>
            <div className={classes.details}>
                <Typography variant={"h3"} className={classes.movieName}>{name}</Typography>
                <div className={classes.rate} style={{backgroundColor: color}}>
                    {/*<StarIcon className={classes.star}/>*/}
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
