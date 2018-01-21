import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

// reducers
import listings from './listings';
import listing from './listing';
import location from './location';


// root reducer

const rootReducer = combineReducers({
  listings,
  listing,
  location,
})

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

export default store;
