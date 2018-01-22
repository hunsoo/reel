import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReduxThunk from 'redux-thunk';

// reducers
import listings from './listings';
import listing from './listing';


// root reducer

const rootReducer = combineReducers({
  form: formReducer,
  listings,
  listing,
})

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

export default store;
