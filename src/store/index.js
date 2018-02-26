import { createStore, applyMiddleware, compose } from 'redux';
import {persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import DevToolsContainer from '../containers/DevToolsContainer';
import rootReducer from '../reducers';

const middlewares = [
    thunk,
    promiseMiddleware({
        promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
    }),
];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger );
}

const enhancers = [applyMiddleware(...middlewares)];

if (process.env.NODE_ENV !== 'production') {
    enhancers.push(
        DevToolsContainer.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
        
}

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer, 
        preloadedState, 
        compose(...enhancers)
    );
    if (module.hot) {
        module
            .hot
            .accept('../reducers', () => {
                const nextReducer = require('../reducers').default;
                store.replaceReducer(nextReducer);
            });
    }
    return store;
}
