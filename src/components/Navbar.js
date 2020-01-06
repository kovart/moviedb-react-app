import React, {useCallback, useEffect, useState} from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import {Menu as MenuIcon} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"
import SearchInput from "./SearchInput"
import SearchOutput from "./SearchOutput"
import {cancelSearch, changeQuery, searchMovies} from "../store/domains/search/search.actions"
import {connect} from "react-redux"
import {debounce} from "./utils/debounce"
import FavoriteIcon from '@material-ui/icons/Favorite'
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(theme => ({
    menu: {
        marginRight: 10
    },
    brand: {
        textDecoration: 'none',
        color: 'inherit'
    }
}))

function Navbar(props) {
    const {query, foundMovies, entities} = props
    const {changeQuery, searchMovies, cancelSearch} = props
    const classes = useStyles()

    const [isOutputOpen, setIsOutputOpen] = useState(false)

    // add 'genres' property
    const output = foundMovies.map(movie => ({...movie, genres: movie.genreIds.map(id => entities.genresById[id])}))

    const searchDebounce = useCallback(debounce(function (value) {
        searchMovies(value)
        setIsOutputOpen(true)
    }, 600), [searchMovies])

    function handleSearchInput(e) {
        const value = e.target.value
        changeQuery(value)
        cancelSearch()
        if (value.length && value.trim().length < 2) return
        searchDebounce(value)
    }

    useEffect(function () {
        bodyScrolling(!(isOutputOpen && foundMovies.length))
    }, [isOutputOpen, foundMovies])

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menu}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link to="/" className={classes.brand}>Cinema App</Link>
                    </Typography>
                    <SearchInput
                        value={query}
                        placeholder={"Search..."}
                        style={{marginLeft: 30}}
                        onChange={handleSearchInput}
                        onFocus={() => setIsOutputOpen(true)}
                    />
                    <div style={{marginLeft: 'auto'}}>
                        <IconButton component={Link} to="/favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                            <VisibilityIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {(!!output.length && isOutputOpen) &&
            <SearchOutput movies={output} onClose={e => setIsOutputOpen(false)}/>}
        </React.Fragment>
    )
}

function bodyScrolling(enabled) {
    document.body.style.overflow = enabled ? '' : 'hidden'
}

function mapStateToProps(state) {
    return {
        ...state.search,
        entities: state.entities
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
