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
import {searchReducer} from "./domains/search/search.reducer"

const getMiddleware = function () {
    return process.env.NODE_ENV === 'production' ?
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
    search: searchReducer,
    entities: entitiesReducer,
    router: connectRouter(history)
})

export const store = createStore(rootReducer, getMiddleware())
