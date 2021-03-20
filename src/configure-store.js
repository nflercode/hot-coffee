import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers';

export default function configureStore() {
    return createStore(rootReducers, /*composeWithDevTools(
        applyMiddleware(thunk)
    )*/);
}