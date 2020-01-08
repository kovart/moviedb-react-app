import React, {useCallback, useEffect, useState} from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import {Menu as MenuIcon} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import {makeStyles, withStyles} from "@material-ui/core/styles"
import SearchInput from "./SearchInput"
import SearchOutput from "./SearchOutput"
import {cancelSearch, changeQuery, searchMovies} from "../store/domains/search/search.actions"
import {connect} from "react-redux"
import {debounce} from "./utils/debounce"
import FavoriteIcon from '@material-ui/icons/Favorite'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Button from "@material-ui/core/Button"
import SearchIcon from '@material-ui/icons/Search'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useTheme} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    menu: {
        marginRight: 10
    },
    brand: {
        textDecoration: 'none',
        color: 'inherit'
    },
    overlay: {
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        background: 'rgba(9, 9, 10, 0.6)',
        zIndex: 1
    },
}))

const CustomAppBar = withStyles({
    root: {
        color: '#333',
        background: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }
})(AppBar)

const NavButton = withStyles(theme => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        "&:hover": {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }
    }
}))(Button)

function Navbar(props) {
    const theme = useTheme();
    const {onMenu} = props
    const {query, foundMovies, entities, location} = props
    const {changeQuery, searchMovies, cancelSearch} = props
    const classes = useStyles()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [showMobileSearch, setShowMobileSearch] = useState(false)
    const [showOutput, setShowOutput] = useState(false)

    // add 'genres' property
    const output = foundMovies.map(movie => ({...movie, genres: movie.genreIds.map(id => entities.genresById[id])}))

    const searchDebounce = useCallback(debounce(function (value) {
        searchMovies(value)
        setShowOutput(true)
    }, 600), [searchMovies])

    function handleSearchInput(e) {
        const value = e.target.value
        changeQuery(value)
        cancelSearch()
        if (value.length && value.trim().length < 2) return
        searchDebounce(value)
    }

    // disable/enable scrolling of body element
    useEffect(function () {
        bodyScrolling(!(showOutput && foundMovies.length))
    }, [showOutput, foundMovies])

    // hide output when location (page) has changed
    useEffect(function () {
        setShowOutput(false)
    }, [location])

    const mobileNavBar = () => (
        <React.Fragment>
            {showOutput && <div className={classes.overlay} onClick={e => setShowOutput(false)}/>}
            <CustomAppBar position="sticky">
                <Toolbar>
                    <IconButton onClick={onMenu} edge="start" color="inherit" aria-label="menu" className={classes.menu}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link to="/" className={classes.brand}>Cinema App</Link>
                    </Typography>
                    <IconButton onClick={e => setShowMobileSearch(!showMobileSearch)} style={{marginLeft: 'auto'}}>
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
                {showMobileSearch && <div style={{margin: '5px 15px 10px 15px'}}>
                    <SearchInput
                        value={query}
                        style={{width: '100%', height: 50}}
                        placeholder={"Search..."}
                        onChange={handleSearchInput}
                        onBlur={e => !query && setShowOutput(false) }
                        onFocus={() => setShowOutput(true)}
                    />
                </div>}
            </CustomAppBar>
            {(!!output.length && showOutput) && <SearchOutput movies={output}/>}
        </React.Fragment>
    )

    const desktopNavbar = () => (
        <React.Fragment>
            {showOutput && <div className={classes.overlay} onClick={e => setShowOutput(false)}/>}
            <CustomAppBar position="sticky">
                <Toolbar>
                    <IconButton onClick={onMenu} edge="start" color="inherit" aria-label="menu" className={classes.menu}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link to="/" className={classes.brand}>Cinema App</Link>
                    </Typography>
                    <SearchInput
                        value={query}
                        placeholder={"Search..."}
                        style={{marginLeft: 30, width: 250}}
                        onChange={handleSearchInput}
                        onBlur={e => !query && setShowOutput(false) }
                        onFocus={() => setShowOutput(true)}
                    />
                    <div style={{marginLeft: 'auto'}}>
                        <NavButton component={Link} to="/favorites" color="inherit">
                            <FavoriteIcon style={{marginRight: 10, fill: "#f50057"}}/>
                            Favorites
                        </NavButton>
                        <NavButton component={Link} to="/visited" color="inherit">
                            <VisibilityIcon style={{marginRight: 10, fill: '#115293'}}/>
                            Visited
                        </NavButton>
                    </div>
                </Toolbar>
            </CustomAppBar>
            {(!!output.length && showOutput) && <SearchOutput movies={output}/>}
        </React.Fragment>
    )

    return (
        isMobile ? mobileNavBar() : desktopNavbar()
    )
}

function bodyScrolling(enabled) {
    document.body.style.overflow = enabled ? '' : 'hidden'
}

function mapStateToProps(state) {
    return {
        ...state.search,
        entities: state.entities,
        location: state.router.location.pathname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchMovies: (query) => dispatch(searchMovies(query)),
        cancelSearch: () => dispatch(cancelSearch()),
        changeQuery: (value) => dispatch(changeQuery(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
