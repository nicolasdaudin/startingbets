import React from 'react';
import {Router,Route,Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AdminDashboardPage from '../components/AdminDashboardPage.js';
import AdminJourneyPage from '../components/AdminJourneyPage.js';
import UserJourneyPage from '../components/UserJourneyPage.js';
import NotFoundPage from '../components/NotFoundPage.js';
import LoginPage from '../components/LoginPage.js';
import PrivateRoute from './PrivateRoute.js';
import PublicRoute from './PublicRoute.js';
import AddUserPage from '../components/AddUserPage.js';
import EditUserPage from '../components/EditUserPage.js';



export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact={true}/>
        <PrivateRoute path='/admin/dashboard' component={AdminDashboardPage}/> 
        <PrivateRoute path='/admin/user/create' component={AddUserPage} />
        <PrivateRoute path='/admin/user/edit/:id' component={EditUserPage} />      
        <PrivateRoute path='/user/journey/1' component={UserJourneyPage}/>
        <PrivateRoute path='/admin/journey/1' component={AdminJourneyPage}/>        
        <Route component={NotFoundPage} />      
      </Switch>
    </div>
    </Router>
);

export default AppRouter;