import React from 'react'
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from '@material-ui/icons/Search'
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap',
    },
    icon: {
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        height: '100%',
        width: theme.spacing(7),
        pointerEvents: 'none',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        color: 'inherit',
        paddingLeft: theme.spacing(7),
        padding: 4,
        transition: theme.transitions.create('background'),
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        "&:focus, &:hover": {
            background: 'rgba(0, 0, 0, 0.065)',
        },
        '&:focus': {
            minWidth: 400
        }
    }
}))

function SearchInput({value, placeholder, onChange, onFocus, onBlur, style}) {
    const classes = useStyles()

    return (
        <div className={classes.root} style={style}>
            <div className={classes.icon}>
                <SearchIcon />
            </div>
            <InputBase className={classes.input}
                       value={value}
                       type="search"
                       onChange={onChange}
                       onFocus={onFocus}
                       onBlur={onBlur}
                       placeholder={placeholder}
                       inputProps={{ 'aria-label': 'search' }} />
        </div>
    )
}

export default SearchInput
