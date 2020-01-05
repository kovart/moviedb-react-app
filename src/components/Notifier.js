import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withSnackbar} from 'notistack'
import {removeError} from "../store/domains/ui/ui.actions"
import {Button} from "@material-ui/core"

const displayed = []

function Notifier({enqueueSnackbar, closeSnackbar, removeError, errors = []}) {

    useEffect(function () {
        errors.forEach(error => {
            if(displayed.includes(error.id)) return
            enqueueSnackbar(error.message, {
                key: error.id,
                variant: "error",
                action: key => (
                    <Button onClick={() => closeSnackbar(key)}>OK</Button>
                ),
                onExited: (event, reason, key) => {
                    displayed.splice(displayed.indexOf(error.id), 1)
                    removeError(error)
                }
            })
            displayed.push(error.id)
        })
    }, [errors, closeSnackbar, enqueueSnackbar, removeError])

    return null
}

function mapStateToProps(state) {
    return {
        errors: state.ui.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeError: id => dispatch(removeError(id))
    }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Notifier));
