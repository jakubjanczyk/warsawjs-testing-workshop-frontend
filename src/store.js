import { createStore } from 'redux';
import { reducers } from './reducers/reducers';

export const getStore = (initialState = {}) => {
    return createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
