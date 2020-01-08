import React from 'react'
import LazyLoad from 'react-lazyload'
import {connect} from "react-redux"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import EmptyBlock from "./placeholders/EmptyBlock"
import {fetchMovie} from "../store/domains/entities/entities.actions"
import {getMovie} from "../store/utils"
import {toggleFavorite} from "../store/domains/user/user.actions"
import MovieCardFetch from "./MovieCardFetch"
import MovieList, {MovieListItem} from "./MovieList"

function Favorites({isAppReady, movieIds, entities, user, fetchMovie, toggleFavorite}) {

    return (
        <Container style={{margin: '20px auto'}}>
            <Typography component="h2" variant="h4" style={{margin: '40px 0'}}>
                Favorite movies
            </Typography>
            {!movieIds.length && (
                <EmptyBlock text="You haven't marked favorite movies yet"/>
            )}
            {!!movieIds.length && (
                <MovieList>
                    {movieIds.map(id => {
                        const movie = getMovie(id, entities, user)
                        return (
                            <LazyLoad minheight={400} key={id} once>
                                <MovieListItem>
                                    <MovieCardFetch
                                        id={id}
                                        movie={movie}
                                        fetch={fetchMovie}
                                        ready={isAppReady}
                                        onFavorite={toggleFavorite}
                                    />
                                </MovieListItem>
                            </LazyLoad>
                        )
                    })}
                </MovieList>
            )}
        </Container>
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
