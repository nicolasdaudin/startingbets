import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
//import expensesReducer from '../reducers/expenses';
//import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import conversationReducer from '../reducers/conversation';
import bookmakersReducer from '../reducers/bookmakers';
import earningsReducer from '../reducers/earnings';
import usersReducer from '../reducers/users';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
  const store = createStore(
    combineReducers({
      //expenses : expensesReducer,
      //filters: filtersReducer,
      auth: authReducer,
      conversation:conversationReducer,
      bookmakers:bookmakersReducer,
      earnings:earningsReducer,
      users:usersReducer

    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  );

  return store;
}

