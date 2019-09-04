import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  
import AppRouter, {history} from './routers/AppRouter';
import {login,logout} from './actions/auth.js';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import  './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import numeral from 'numeral';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import {startSetMessages} from './actions/conversation.js'
import {startSetBookmakerData} from './actions/bookmaker.js';

moment.locale('fr');

// load a locale
numeral.register('locale', 'fr', {
  delimiters: {
      thousands: ' ',
      decimal: '.' // should be ',' but otherwise it won't recognize the 34.50 (for example) in the React Data Grid in Bookmaker thingy
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  ordinal : function (number) {
      return number === 1 ? 'er' : 'ème';
  },
  currency: {
      symbol: '€'
  }
});

// switch between locales
numeral.locale('fr');

const store = configureStore();
//console.log('testing sourcemaps');
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<LoadingPage />,document.getElementById('app'));

let hasRendered = false;

const renderApp = () => {
  console.log('calling renderApp - hasRendered',hasRendered)
  if (!hasRendered){
    ReactDOM.render(jsx ,document.getElementById('app'));
    hasRendered = true;
  }
}



firebase.auth().onAuthStateChanged( (user) => {
  // this is called on each change of user auth state, but also at the beginning
  // so if the user was already logged in and we refresh, we will go through 'user logged in'
  // thats why we want to redirect him to dashboard if he was in the login page, otherwise we don't redirect him
  if (user) { 
    // user logged in
    console.log('user logged in');

    store.dispatch(login(user.uid));
    store.dispatch(startSetMessages());
    store.dispatch(startSetBookmakerData());

    renderApp();
    if (history.location.pathname === '/'){
      history.push('/admin/dashboard');
    }
    /*store.dispatch(startSetExpenses()).then( () => {
      renderApp();
      if (history.location.pathname === '/'){
        history.push('/dashboard');
      }
    });*/
  } else {
    // user logged out
    console.log('user logged out');
    
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
