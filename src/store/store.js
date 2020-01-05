import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import {createBrowserHistory} from 'history'
import {MovieDbApiMiddleware} from "./middlewares/moviedb-api"
import {createLogger} from "redux-logger"
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {commonReducer} from "./domains/common/common.reducer"
import {uiReducer} from "./domains/ui/ui.reducer"
import {userReducer} from "./domains/user/user.reducer"
import {movieReducer} from "./domains/movie/movie.reducer"
import {homeReducer} from "./domains/home/home.reducer"
import {entitiesReducer} from "./domains/entities/entities.reducer"
import {searchReducer} from "./domains/search/search.reducer"

export const history = createBrowserHistory()

const getMiddleware = function () {
    return process.env.NODE_ENV === 'production' ?
        applyMiddleware(MovieDbApiMiddleware(), routerMiddleware(history)) :
        applyMiddleware(MovieDbApiMiddleware(), routerMiddleware(history), createLogger())
}

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(getMiddleware()))
