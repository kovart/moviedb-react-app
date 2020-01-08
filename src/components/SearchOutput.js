import React from 'react'
import PropTypes from 'prop-types'
import {Movie} from "./types/movie-type"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import {makeStyles, Typography} from "@material-ui/core"
import {getScoreColor} from "./utils/score-color"
import {Link} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        maxHeight: 400,
        width: '100%',
        overflowY: 'auto',
        background: 'white',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.22)',
        zIndex: 2
    }
}))

SearchOutput.propTypes = {
    movies: PropTypes.arrayOf(Movie)
}

function SearchOutput({movies = [], fullHeight = false}) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <List className={classes.root} aria-labelledby="nested-list-subheader">
                {movies.map(movie => <Item key={movie.id} movie={movie} />)}
            </List>
        </React.Fragment>
    )
}

const useItemStyles = makeStyles(theme => ({
    item: {
        height: 60,
        padding: theme.spacing(1),
        paddingLeft: 20,

        [theme.breakpoints.down('sm')]: {
            height: 90,
        }
    },
    itemImage: {
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        flexShrink: 0
    },
    itemInfo: {
         marginLeft: theme.spacing(2),
         marginRight: theme.spacing(2)
    },
    vote: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
        padding: theme.spacing(1),
        height: '100%',
        fontWeight: 'bold',
        fontSize: '12pt',
    }
}))

function Item({movie}){
    const classes = useItemStyles()

    const poster = movie.posterImageUrl || require('../assets/images/abstract_movie_poster.svg')

    const color = getScoreColor(movie.voteAverage)

    return (
        <ListItem button component={Link} className={classes.item} to={"/movie/" + movie.id}>
                <img className={classes.itemImage} src={poster} alt={movie.title}/>
                <div className={classes.itemInfo}>
                    <Typography variant="body1">
                        <span style={{fontWeight: 500}}>{movie.title}</span>
                        <span style={{color: 'grey'}}>{movie.releaseDate > 0 ? ` (${movie.releaseDate.getFullYear()})` : ''}</span>
                    </Typography>
                    <Typography variant="body2" component="span" style={{color: 'grey'}}>
                        {!!movie.genres.length ? movie.genres.join(', ') : '—'}
                    </Typography>
                </div>
                <Typography
                    variant="body2"
                    className={classes.vote}
                    style={{color: color}}
                >
                    {movie.voteAverage > 0 ? movie.voteAverage : '—'}
                </Typography>
        </ListItem>
    )
}

export default SearchOutput
