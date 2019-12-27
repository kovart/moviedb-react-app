import React, {useEffect} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline"
import {connect} from "react-redux"
import LinearProgress from "@material-ui/core/LinearProgress"
import {fetchGenres} from "./store/domains/common/common.actions"
import {SnackbarProvider} from "notistack"
import Notifier from "./components/Notifier"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

function App(props) {
    const {isLoading, fetchGenres} = props

    useEffect(function () {
        fetchGenres()
    }, [fetchGenres])


    return (
        <SnackbarProvider autoHideDuration={30 * 1000}>
            <CssBaseline/>
            <Notifier/>
            {isLoading && <LinearProgress style={{position: 'fixed', top: 0, width: '100%', zIndex: 9999}}/>}
            <Navbar/>
            <Home />
        </SnackbarProvider>
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
