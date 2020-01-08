import React, {useCallback, useEffect} from 'react'
import {useParams} from "react-router"
import {connect} from "react-redux"
import LazyLoad from 'react-lazyload'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Rating from "@material-ui/lab/Rating"
import {makeStyles} from "@material-ui/core/styles"
import {fetchMoviePage, fetchRecommendedMovies, fetchSimilarMovies} from "../store/domains/movie/movie.actions"
import {getMovie} from "../store/utils"
import MovieBrowser from "./MovieBrowser"
import MoviePagePlaceholder from "./placeholders/MoviePagePlaceholder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import Button from "@material-ui/core/Button"
import {makeMovieVisited, toggleFavorite} from "../store/domains/user/user.actions"
import {Formatter} from "./utils/formatter"
import EmptyBlock from "./placeholders/EmptyBlock"

function Movie(props) {
    const {id: urlId} = useParams()
    const {
        isAppReady,
        movie,
        fetchMovie,
        toggleFavorite,
        makeMovieVisited,
    } = props

    useEffect(function () {
        fetchMovie(urlId)
        window.scrollTo({top: 0, left: 0})
    }, [urlId, fetchMovie])

    useEffect(function () {
        if(movie.isFetched) makeMovieVisited(movie.id)
    }, [movie.id, makeMovieVisited])

    return (
        <React.Fragment>
            <MovieInfo movie={movie} loaded={isAppReady && movie.isFetched} onFavorite={toggleFavorite}/>
            <MovieRecommendations {...props} id={urlId}/>
        </React.Fragment>
    )
}

const useStyles = makeStyles(theme => ({
    movieContainer: {
        paddingTop: 50,
        paddingBottom: 50,
    },
    backdrop: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: -1,
        '&:after': {
            position: 'absolute',
            content: "''",
            display: 'block',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(30, 47, 60, 0.75)',
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(30, 47, 60, 0.75) 0%, rgba(48, 65, 78, 0.75) 100%)'
        }
    },
    backdropImage: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    poster: {
        width: '100%',
        borderRadius: 10,
        boxShadow: '0px 3px 20px #0000003b',
    },
    releaseDate: {
        fontSize: '11pt',
        color: '#dadde2'
    },
    vote: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12pt'
    },
    genreList: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
    },
    genre: {
        cursor: 'pointer',
        padding: '1px 6px',
        marginRight: 10,
        border: '1px solid white',
        borderRadius: 4,
        fontSize: '10pt'
    },
    subtitle: {
        marginBottom: 8,
        fontSize: '13pt'
    },
    crewList: {
        listStyle: 'none',
        padding: 0,
    },
}))

function MovieInfo({movie, loaded, onFavorite}) {
    const {
        id,
        title,
        genres,
        duration,
        budget,
        backdropImageUrl,
        posterImageUrl,
        releaseDate,
        productionCountries,
        voteAverage,
        legend,
        overview,
        crew,
        actors,

        isFavorite
    } = movie

    const classes = useStyles()

    const poster = posterImageUrl || require('../assets/images/abstract_movie_poster.svg')
    // TODO Add backdrop fallback
    // const backdrop = backdropImageUrl

    // TODO Sort actors and crew by their popularity/importance

    return (
        <main style={{position: 'relative'}}>
            <div className={classes.backdrop}>
                <img className={classes.backdropImage} src={backdropImageUrl} alt={"Backdrop of " + title}/>
            </div>
            <Container className={classes.movieContainer}>
                {loaded ?
                    <Grid container spacing={7}>
                        <Grid item md={3}>
                            <img className={classes.poster} src={poster} alt={"Poster of " + title}/>
                        </Grid>
                        <Grid item md={8} style={{color: 'white'}}>
                            <div className={classes.releaseDate}>
                                {Formatter.formatDate(releaseDate)} ({productionCountries.join(', ')})
                            </div>
                            <Typography variant={"h4"} style={{fontWeight: 'bold'}} component={"h1"}>
                                {title}
                            </Typography>
                            <ul className={classes.genreList}>
                                {genres.map(genre => (
                                    <li className={classes.genre} key={genre}>{genre}</li>
                                ))}
                            </ul>
                            <div className={classes.vote}>
                                <Rating value={voteAverage / 2} readOnly/>
                                <span style={{margin: '2px 0px 0 6px'}}>{voteAverage}/10</span>
                                <Button
                                    style={{marginLeft: 16}}
                                    onClick={() => onFavorite(id)}
                                    variant={isFavorite ? "contained" : "outlined"}
                                    color="secondary"
                                    aria-label="like"
                                >
                                    <FavoriteIcon/>
                                </Button>
                            </div>
                            <div style={{marginTop: 10}}>
                                <Typography component={"div"} style={{marginRight: 15}}>
                                    <b>Duration:</b> {duration} min.
                                </Typography>
                                <Typography component={"div"}>
                                    <b>Budget:</b> {budget ? '$' + Formatter.numberWithCommas(budget) : '-'}
                                </Typography>
                            </div>
                            {legend && <React.Fragment>
                                <h3 className={classes.subtitle}>Legend</h3>
                                <Typography variant={"body1"}>{legend}</Typography>
                            </React.Fragment>}
                            {overview && <React.Fragment>
                                <h3 className={classes.subtitle}>Overview</h3>
                                <Typography variant={"body1"}>{overview}</Typography>
                            </React.Fragment>}
                            {crew.length && <React.Fragment>
                                <h3 className={classes.subtitle}>Crew</h3>
                                <Grid container spacing={3} component="ul" className={classes.crewList}>
                                    {crew.slice(0, 4).map((person, i) => (
                                        <Grid item md={3} sm={6} component="li" key={i} style={{paddingRight: 16}}>
                                            <Typography variant={"body2"}
                                                        style={{fontWeight: 'bold'}}>{person.name}</Typography>
                                            <Typography
                                                variant={"body2"}>{person.department}, {person.job}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </React.Fragment>}
                        </Grid>
                    </Grid> :
                    <MoviePagePlaceholder/>}
            </Container>
        </main>
    )
}

function MovieRecommendations(props) {
    const {
        id,

        movie,
        entities,
        user,

        toggleFavorite,
        fetchSimilarMovies,
        fetchRecommendedMovies,
    } = props

    const {recommendedMovies: recommended, similarMovies: similar} = movie

    const MOVIES_PER_LIST = 6

    const recommendedMovies = recommended.ids.slice(0, MOVIES_PER_LIST).map(id => getMovie(id, entities, user))
    const similarMovies = similar.ids.slice(0, MOVIES_PER_LIST).map(id => getMovie(id, entities, user))

    const fetchSimilarMoviesCb = useCallback(() => fetchSimilarMovies(id), [id, fetchSimilarMovies])
    const fetchRecommendedMoviesCb = useCallback(() => fetchRecommendedMovies(id), [id, fetchRecommendedMovies])

    return (
        <Container>
            <section>
                <h2>Recommended movies</h2>
                <LazyLoad height={400}>
                    <MovieList
                        isFetching={recommended.isFetching}
                        isFetched={recommended.isFetched}
                        movies={recommendedMovies}
                        amount={MOVIES_PER_LIST}
                        fetch={fetchRecommendedMoviesCb}
                        onFavorite={toggleFavorite}
                    />
                </LazyLoad>
            </section>
            <section>
                <h2>Similar movies</h2>
                <LazyLoad height={400}>
                    <MovieList
                        isFetching={similar.isFetching}
                        isFetched={similar.isFetched}
                        movies={similarMovies}
                        amount={MOVIES_PER_LIST}
                        fetch={fetchSimilarMoviesCb}
                        onFavorite={toggleFavorite}
                    />
                </LazyLoad>
            </section>
        </Container>
    )
}


function MovieList({isFetching, isFetched, movies = [], amount, fetch, onFavorite}) {

    useEffect(function () {
        fetch()
    }, [fetch])

    if (isFetched && !movies.length) return (
        <EmptyBlock text={"There is no data for this movie"} />
    )

    return (
        <MovieBrowser placeholdersAmount={amount}
                      isFetching={isFetching}
                      isFetched={isFetched}
                      movies={movies}
                      onFavorite={onFavorite}
        />
    )
}

function mapStateToProps(state) {
    let movie = state.movie.isFetched ? getMovie(state.movie.id, state.entities, state.user) : {}
    movie = {...movie, ...state.movie}
    return {
        isAppReady: state.common.isAppReady,
        movie: movie,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(fetchMoviePage(id)),
        fetchSimilarMovies: (id) => dispatch(fetchSimilarMovies(id)),
        fetchRecommendedMovies: (id) => dispatch(fetchRecommendedMovies(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id)),
        makeMovieVisited: (id) => dispatch(makeMovieVisited(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
