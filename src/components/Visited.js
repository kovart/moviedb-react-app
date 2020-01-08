import React from 'react'
import {connect} from "react-redux"
import {Container} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import EmptyBlock from "./placeholders/EmptyBlock"
import Button from "@material-ui/core/Button"
import {getMovie} from "../store/utils"
import LazyLoad from "react-lazyload"
import MovieCardFetch from "./MovieCardFetch"
import {fetchMovie} from "../store/domains/entities/entities.actions"
import {clearVisitedMovies, toggleFavorite} from "../store/domains/user/user.actions"
import MovieList, {MovieListItem} from "./MovieList"

function Visited({isAppReady, movieIds, entities, user, fetchMovie, toggleFavorite, cleanVisitedMovies}) {
    return (
        <Container style={{margin: '20px auto'}}>
            <div style={{display: 'flex', margin: '40px 0'}} >
                <Typography component="h2" variant="h4">
                    Visited movies
                </Typography>
                <Button onClick={cleanVisitedMovies} style={{marginLeft: 'auto'}} variant="outlined" disabled={!movieIds.length}>Clear history</Button>
            </div>
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

function mapStateToProps(state){
    return {
        isAppReady: state.common.isAppReady,
        movieIds: state.user.visitedMovieIds,
        entities: state.entities,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovie: (id) => dispatch(fetchMovie(id)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id)),
        cleanVisitedMovies: () => dispatch(clearVisitedMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visited)
