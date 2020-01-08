import {makeStyles} from "@material-ui/core/styles"
import React from "react"
import {Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import {getScoreColor} from "./utils/score-color"
import Button from "@material-ui/core/Button"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import classNames from 'classnames'

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        boxShadow: "none",
        textDecoration: 'none',
        color: 'inherit',
        "&:hover": {
            "& $posterImage":{
                transform: 'scale(1.075)'
            },
            "& $posterOverlay": {
                opacity: 1
            },
            "& $favoriteBtn": {
                display: 'flex'
            }
        },
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
    posterOverlay: {
        position: 'absolute',
        content: '""',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        opacity: 0,
        transition: 'all 0.15s ease-in-out',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 41%, rgba(0,0,0,0.40) 100%)'
    },
    details: {
        padding: '6px 4px'
    },
    movieName: {
        fontWeight: "normal",
        margin: "4px 0 8px 0",
        lineHeight: '140%'
    },
    score: {
        display: 'inline-flex',
        position: 'absolute',
        left: -5,
        top: 8,
        justifyContent: 'center',
        fontWeight: 'bold',
        padding: '2px 8px',
        minWidth: 30,
        color: 'white',
        background: '#83d620',
        borderRadius: 2,
        [theme.breakpoints.down('xs')]: {
            left: -8,
            top: 12,
            fontSize: '1.5rem',
            minWidth: 40,
        }
    },
    extraInfo: {
        color: 'grey',
        lineHeight: '150%'
    },
    favoriteBtn: {
        display: 'none',
        position: 'absolute',
        right: 10,
        top: 10,
        minWidth: 16,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: 'white',
        background: 'rgba(75, 87, 95, 0.9)',
        "&:hover": {
            background: 'rgba(245, 0, 87, 1)',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            padding: theme.spacing(2.5),
            "& svg": {
                height: theme.spacing(4),
                width: theme.spacing(4),
            }
        }
    },
    favoriteBtnActive: {
        display: 'flex',
        color: 'white',
        background: 'rgba(245, 0, 87, 1)',
        "&:hover": {
            background: 'rgba(245, 0, 87, 0.85)',
        }
    }
}))


function MovieCard({id, title, genres, voteAverage, releaseDate, posterImageUrl, isFavorite, onFavorite}) {
    const classes = useStyles()

    const color = getScoreColor(voteAverage)

    const vote = voteAverage > 0 ? voteAverage : '-'

    function handleFavorite(e){
        e.stopPropagation()
        e.preventDefault()
        onFavorite && onFavorite(id)
    }

    return (
        <Link className={classes.root} to={"/movie/"+id}>
            <div className={classes.posterContainer}>
                <img className={classes.posterImage} src={posterImageUrl} alt={title}/>
                <div className={classes.posterOverlay} />
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={handleFavorite}
                    className={classNames([classes.favoriteBtn, {[classes.favoriteBtnActive]: isFavorite}])}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon/>}
                </Button>
            </div>
            <div className={classes.details}>
                <Typography component="h4" className={classes.movieName}>{title}</Typography>
                <Typography variant="body1" className={classes.score} style={{backgroundColor: color}}>
                    {vote}
                </Typography>
                <Typography variant="body1" className={classes.extraInfo}>
                    {new Date(releaseDate).getFullYear()} • {genres.length ? genres.slice(0, 3).join(', '): '-'}
                </Typography>
            </div>
        </Link>
    )
}

export default MovieCard
