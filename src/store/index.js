import { createStore, applyMiddleware, compose   } from 'redux';
import ReduxThunk from 'redux-thunk';
import FlightsReducer from './reducers/FlightsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(FlightsReducer,null,composeEnhancers(applyMiddleware( ReduxThunk )));