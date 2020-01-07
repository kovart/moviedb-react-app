import React, {useEffect} from 'react'
import LazyLoad from 'react-lazyload'
import {connect} from "react-redux"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import MovieCard from "./MovieCard"
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder"
import Grid from "@material-ui/core/Grid"
import EmptyBlock from "./placeholders/EmptyBlock"
import {fetchMovie} from "../store/domains/entities/entities.actions"
import {getMovie} from "../store/utils"
import {toggleFavorite} from "../store/domains/user/user.actions"

function Favorites({isAppReady, movieIds, entities, user, fetchMovie, toggleFavorite}) {

    return (
        <Container style={{margin: '20px auto'}}>
            <Typography component="h2" variant="h4" style={{margin: '40px 0'}} gutterBottom>
                Favorite movies
            </Typography>
            {!movieIds.length && (
                <EmptyBlock text="You haven't marked favorite movies yet"/>
            )}
            {!!movieIds.length && (
                <Grid container spacing={2}>
                    {movieIds.map(id => {
                        const movie = getMovie(id, entities, user)
                        return (
                            <LazyLoad minheight={400} key={id} once>
                                <Grid item sm={12} md={2}>
                                    <MovieFetcher
                                        id={id}
                                        movie={movie}
                                        fetch={fetchMovie}
                                        ready={isAppReady}
                                        onFavorite={toggleFavorite}
                                    />
                                </Grid>
                            </LazyLoad>
                        )
                    })}
                </Grid>
            )}
        </Container>
    )
}

function MovieFetcher({id, movie, fetch, ready, onFavorite}) {

    useEffect(function () {
        if (!movie && ready) fetch(id)
    }, [id, movie, fetch, ready])

    return (
        !!movie ? <MovieCard {...movie} onFavorite={onFavorite}/> : <MovieCardPlaceholder/>
    )
}

function mapStateToProps(state) {
    return {
        isAppReady: state.common.isAppReady,
        movieIds: state.user.favoriteMovieIds,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(fetchMovie(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
