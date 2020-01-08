import React from "react"
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import MovieCard from "./MovieCard"
import {makeStyles} from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import {Movie} from "./types/movie-type"
import Button from "@material-ui/core/Button"
import {Loop} from "@material-ui/icons"
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder"
import MovieList, {MovieListItem} from "./MovieList"

const useStyles = makeStyles(theme => ({
    loader: {
        height: 400,
        width: 300,
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginTop: 20,
    },
    buttonProgress: {
        color: theme.palette.primary,
        animationDuration: '550ms',
        marginRight: 6
    },
}))

MovieBrowser.propTypes = {
    movies: PropTypes.arrayOf(Movie),
    isFetching: PropTypes.bool,
    isFetched: PropTypes.bool,
    totalMovies: PropTypes.number,
    onLoadMore: PropTypes.func,
    placeholdersAmount: PropTypes.number,
}

function MovieBrowser({movies = [], isFetching, isFetched, totalMovies, placeholdersAmount = 5, onLoadMore, onFavorite}) {
    const classes = useStyles()

    const canLoadMore = movies.length < totalMovies && !!onLoadMore

    return (
        <React.Fragment>
            <MovieList>
                {(isFetched ? movies : Array.from(new Array(placeholdersAmount))).map((movie, index) => (
                    <MovieListItem key={movie ? movie.id : 'index:'+index}>
                        {movie ?
                            <LazyLoad height={400} once placeholder={<MovieCardPlaceholder />}>
                                <MovieCard {...movie} onFavorite={onFavorite} />
                            </LazyLoad> :
                            <MovieCardPlaceholder/>}
                    </MovieListItem>
                ))}
            </MovieList>
            {canLoadMore &&
            <Button className={classes.button} variant="outlined" fullWidth size={"large"} disabled={isFetching} onClick={onLoadMore}>
                {isFetching ?
                    <CircularProgress
                        className={classes.buttonProgress}
                        variant="indeterminate"
                        disableShrink
                        size={16}
                        thickness={4}/> :
                    <Loop className={classes.buttonProgress}/>}
                {isFetching ? 'Loading...' : 'Load more'}
            </Button>}
        </React.Fragment>
    )
}

export default MovieBrowser
