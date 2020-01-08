import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {Switch, Route} from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import LinearProgress from "@material-ui/core/LinearProgress"
import {fetchGenres} from "../store/domains/common/common.actions"
import {SnackbarProvider} from "notistack"
import Notifier from "./Notifier"
import Home from "./Home"
import Navbar from "./Navbar"
import Movie from "./Movie"
import Page404 from "./Page404"
import Favorites from "./Favorites"
import Visited from "./Visited"
import Sidebar from "./Sidebar"

function App(props) {
    const {isLoading, location, fetchGenres} = props
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(function () {
        fetchGenres()
    }, [fetchGenres])

    useEffect(function () {
        setShowSidebar(false)
    }, [location])

    return (
        <SnackbarProvider autoHideDuration={30 * 1000}>
            <CssBaseline/>
            <Notifier/>
            {isLoading && <LinearProgress style={{position: 'fixed', top: 0, width: '100%', zIndex: 9999}}/>}
            <Navbar onMenu={() => setShowSidebar(!showSidebar)}/>
            <Sidebar open={showSidebar} onClose={() => setShowSidebar(!showSidebar)} />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/movie/:id" component={Movie}/>
                <Route path="/favorites" component={Favorites}/>
                <Route path="/visited" component={Visited}/>
                <Route component={Page404}/>
            </Switch>
        </SnackbarProvider>
    );
}

function mapStateToProps(state) {
    return {
        isLoading: !state.common.isGenresLoaded || state.search.isFetching || state.movie.isFetching,
        errors: state.ui.errors,
        location: state.router.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGenres: () => dispatch(fetchGenres()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
