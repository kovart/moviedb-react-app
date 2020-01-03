import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import LinearProgress from "@material-ui/core/LinearProgress"
import {fetchGenres} from "./store/domains/common/common.actions"
import {SnackbarProvider} from "notistack"
import Notifier from "./components/Notifier"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Movie from "./components/Movie"
import Page404 from "./components/Page404"

function App(props) {
    const {isLoading, fetchGenres} = props

    useEffect(function () {
        fetchGenres()
    }, [fetchGenres])

    return (
        <Router>
            <SnackbarProvider autoHideDuration={30 * 1000}>
                <CssBaseline/>
                <Notifier/>
                {isLoading && <LinearProgress style={{position: 'fixed', top: 0, width: '100%', zIndex: 9999}}/>}
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/movie/:id" component={Movie}/>
                    <Route component={Page404}/>
                </Switch>
            </SnackbarProvider>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
        isLoading: !state.common.isGenresLoaded,
        errors: state.ui.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGenres: () => dispatch(fetchGenres()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
