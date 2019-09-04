import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
//import expensesReducer from '../reducers/expenses';
//import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import conversationReducer from '../reducers/conversation';
import bookmakerReducer from '../reducers/bookmaker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
  const store = createStore(
    combineReducers({
      //expenses : expensesReducer,
      //filters: filtersReducer,
      auth: authReducer,
      conversation:conversationReducer,
      bookmaker:bookmakerReducer

    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  );

  return store;
}

