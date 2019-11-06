import React from 'react';
import {Router,Route,Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import UserJourneyPage from '../components/UserJourneyPage.js';
import NotFoundPage from '../components/NotFoundPage.js';

import LoginPage from '../components/user/LoginPage.js';
import EmailSignUpPage from '../components/user/EmailSignUpPage.js';
import EmailSignInPage from '../components/user/EmailSignInPage.js';

import SignInPage from '../components/admin/SignInPage.js';
import AdminDashboardPage from '../components/admin/AdminDashboardPage.js';
import AdminJourneyPage from '../components/admin/AdminJourneyPage.js';



import PrivateRoute from './PrivateRoute.js';
import PublicRoute from './PublicRoute.js';
import AdminRoute from './AdminRoute.js';
import UserRoute from './UserRoute.js';
import AddUserPage from '../components/AddUserPage.js';
import EditUserPage from '../components/EditUserPage.js';



export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact={true}/>
        <PublicRoute path='/user/signup' component={EmailSignUpPage}/>
        <PublicRoute path='/user/signin' component={EmailSignInPage}/>
        <PublicRoute path='/admin/signin' component={SignInPage}/>
        <AdminRoute path='/admin/dashboard' component={AdminDashboardPage}/> 
        <AdminRoute path='/admin/user/edit/:userid' component={EditUserPage} />              
        <AdminRoute path='/admin/journey/:userid' component={AdminJourneyPage}/>     
        <UserRoute path='/user/journey/:userid' component={UserJourneyPage}/>
        <UserRoute path='/user/dashboard' component={UserJourneyPage}/>    
        <Route component={NotFoundPage} />      
      </Switch>
    </div>
    </Router>
);

export default AppRouter;