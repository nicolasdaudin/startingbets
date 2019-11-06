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

// for persistance between app relaunches or screen refresh (with refresh button in browser)
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
  //expenses : expensesReducer,
  //filters: filtersReducer,
  auth: authReducer,
  conversation:conversationReducer,
  bookmakers:bookmakersReducer,
  earnings:earningsReducer,
  users:usersReducer

});

const persistedReducer = persistReducer(persistConfig,rootReducer)


export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  );

  let persistor = persistStore(store);

  return {store,persistor}
}

