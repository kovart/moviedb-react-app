import React, {useCallback, useEffect, useState} from 'react'
import Container from "@material-ui/core/Container"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import MovieBrowser from "./MovieBrowser"
import {makeStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import {fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies} from "../store/domains/home/home.actions"
import {getMovie} from "../store/utils"

const useStyles = makeStyles(theme => ({
    movieList: {
        margin: '20px 0px'
    },
    container: {
        margin: '12px auto'
    },
    tabs: {
        margin: '8px 0'
    }
}))

const categories = {
    POPULAR: 'popular',
    TOP_RATED: 'top-rated',
    UPCOMING: 'upcoming'
}

const MOVIES_PER_PAGE = 20

function Home(props) {
    const {
        isAppReady,

        popularMovies,
        topRatedMovies,
        upcomingMovies,

        entities,

        fetchPopularMovies,
        fetchTopRatedMovies,
        fetchUpcomingMovies,
    } = props

    const [categoryName, setCategoryName] = useState(categories.POPULAR)
    const categoryMap = {
        [categories.POPULAR]: {
            movies: popularMovies,
            fetch: fetchPopularMovies
        },
        [categories.TOP_RATED]: {
            movies: topRatedMovies,
            fetch: fetchTopRatedMovies
        },
        [categories.UPCOMING]: {
            movies: upcomingMovies,
            fetch: fetchUpcomingMovies,
        }
    }
    const category = categoryMap[categoryName]
    const movies = isAppReady ? category.movies.ids.map(id => getMovie(id, entities)) : []

    function loadMore() {
        if(category.movies.totalMovies === category.movies.ids.length) return
        category.fetch(category.movies.ids.length / MOVIES_PER_PAGE + 1)
    }

    function switchTab(name){
        setCategoryName(name)
        const newCategory = categoryMap[name]
        if(!newCategory.movies.ids.length) newCategory.fetch()
    }

    useEffect(function () {
        switchTab(categories.POPULAR)
        // TODO Should I memorize the function and constants?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const classes = useStyles()

    return (
        <Container className={classes.container}>
                <Tabs
                    className={classes.tabs}
                    value={categoryName}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, newValue) => switchTab(newValue)}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Popular" value={categories.POPULAR}/>
                    <Tab label="Top rated" value={categories.TOP_RATED}/>
                    <Tab label="Trending" value={categories.UPCOMING}/>
                </Tabs>
                <main className={classes.movieList}>
                    <MovieBrowser
                        onLoadMore={loadMore}
                        placeholdersAmount={10}
                        movies={movies}
                        isFetched={category.movies.isFetched}
                        isFetching={!isAppReady || category.movies.isFetching}
                        totalMovies={category.movies.totalMovies}/>
                </main>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        isAppReady: state.common.isAppReady,

        popularMovies: state.home.popularMovies,
        topRatedMovies: state.home.topRatedMovies,
        upcomingMovies: state.home.upcomingMovies,

        entities: state.entities,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPopularMovies: (page) => dispatch(fetchPopularMovies(page)),
        fetchTopRatedMovies: (page) => dispatch(fetchTopRatedMovies(page)),
        fetchUpcomingMovies: (page) => dispatch(fetchUpcomingMovies(page)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
