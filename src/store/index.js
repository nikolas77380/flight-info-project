import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import FlightsReducer from './reducers/FlightsReducer';

export const store = createStore(FlightsReducer,null,applyMiddleware( ReduxThunk ));

// const configureStore = () => {
//     let store = createStore(FlightsReducer, null, applyMiddleware(ReduxThunk));
//     return store;
//   };
  
  
//   console.disableYellowBox = true;
//   export default configureStore;