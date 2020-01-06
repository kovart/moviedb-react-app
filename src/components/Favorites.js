import React, {useEffect} from 'react'
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import {connect} from "react-redux"
import MovieCard from "./MovieCard"
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder"
import Grid from "@material-ui/core/Grid"
import LazyLoad from 'react-lazyload'
import {fetchMovie} from "../store/domains/movie/movie.actions"
import {getMovie} from "../store/utils"
import CircularProgress from "@material-ui/core/CircularProgress"
import {toggleFavorite} from "../store/domains/user/user.actions"

function Favorites({isAppReady, movieIds, entities, user, fetchMovie, toggleFavorite}) {

    return (
        <Container style={{margin: '20px auto'}}>
            <Typography component="h1" variant="h4" gutterBottom style={{marginBottom: 30}}>Your favorite movies</Typography>
            {!isAppReady ?
                <div style={{height: 300, background: 'grey'}}>
                    <CircularProgress disableShrink />
                </div> :
                <Grid container spacing={2}>
                    {movieIds.map(id => {
                        const movie = getMovie(id, entities, user)
                        return (
                            <LazyLoad minheight={400} key={id} once>
                                <Grid item sm={12} md={2}>
                                    <MovieFetcher id={id} movie={movie} fetch={fetchMovie} onFavorite={toggleFavorite} />
                                </Grid>
                            </LazyLoad>
                        )
                    })}
            </Grid>}
        </Container>
    )
}

function MovieFetcher({id, movie, fetch, onFavorite}){

    useEffect(function () {
        if(!movie) fetch(id)
    }, [id, movie, fetch])

    return (
        !!movie ? <MovieCard {...movie} onFavorite={onFavorite} /> : <MovieCardPlaceholder />
    )
}


function mapStateToProps(state){
    return {
        isAppReady: state.common.isAppReady,
        movieIds: state.user.favoriteMovieIds,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchMovie: (id) => dispatch(fetchMovie(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
