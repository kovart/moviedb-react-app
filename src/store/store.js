import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createBrowserHistory} from 'history'
import {MovieDbApiMiddleware} from "./middlewares/moviedb-api"
import {createLogger} from "redux-logger"
import {connectRouter} from 'connected-react-router'
import {commonReducer} from "./domains/common/common.reducer"
import {uiReducer} from "./domains/ui/ui.reducer"
import {userReducer} from "./domains/user/user.reducer"
import {movieReducer} from "./domains/movie/movie.reducer"
import {homeReducer} from "./domains/home/home.reducer"
import {entitiesReducer} from "./domains/entities/entities.reducer"

const getMiddleware = function () {
    return process.node.NODE_ENV === 'production' ?
        applyMiddleware(MovieDbApiMiddleware()) :
        applyMiddleware(MovieDbApiMiddleware(), createLogger())
}

export const history = createBrowserHistory()

const rootReducer = combineReducers({
    ui: uiReducer,
    common: commonReducer,
    user: userReducer,
    movie: movieReducer,
    home: homeReducer,
    entities: entitiesReducer,
    router: connectRouter(history)
})

export const store = createStore(rootReducer, null, getMiddleware())
