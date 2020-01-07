import React, {useEffect, useState} from 'react'
import Container from "@material-ui/core/Container"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import MovieBrowser from "./MovieBrowser"
import {makeStyles} from "@material-ui/core/styles"
import {connect} from "react-redux"
import {fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies} from "../store/domains/home/home.actions"
import {toggleFavorite} from "../store/domains/user/user.actions"
import {getMovie} from "../store/utils"
import withStyles from "@material-ui/core/styles/withStyles"

const useStyles = makeStyles(theme => ({
    movieList: {
        margin: '20px 0px'
    },
    container: {
        margin: '12px auto'
    },
}))

const CustomTabs = withStyles({
    root: {
        borderRadius: 4,
        border: '1px solid rgb(242, 242, 242)',
        overflow: 'hidden',
        background: 'white',
    },
    indicator: {
        background: 'none'
    }
})(Tabs)

const CustomTab = withStyles({
    root: {
        minWidth: 110
    },
    selected: {
        background: '#115293',
        color: 'white'
    }
})(Tab)

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
        user,

        toggleFavorite,
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
    const movies = isAppReady ? category.movies.ids.map(id => getMovie(id, entities, user)) : []

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
                <CustomTabs
                    value={categoryName}
                    onChange={(e, newValue) => switchTab(newValue)}
                    aria-label="disabled tabs example"
                >
                    <CustomTab label="Popular" value={categories.POPULAR}/>
                    <CustomTab label="Top rated" value={categories.TOP_RATED}/>
                    <CustomTab label="Upcoming" value={categories.UPCOMING}/>
                </CustomTabs>
                <main className={classes.movieList}>
                    <MovieBrowser
                        onLoadMore={loadMore}
                        placeholdersAmount={10}
                        movies={movies}
                        onFavorite={toggleFavorite}
                        isFetched={category.movies.isFetched}
                        isFetching={!isAppReady || category.movies.isFetching}
                        totalMovies={category.movies.totalMovies}
                    />
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
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPopularMovies: (page) => dispatch(fetchPopularMovies(page)),
        fetchTopRatedMovies: (page) => dispatch(fetchTopRatedMovies(page)),
        fetchUpcomingMovies: (page) => dispatch(fetchUpcomingMovies(page)),
        toggleFavorite: (id) => dispatch(toggleFavorite(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
