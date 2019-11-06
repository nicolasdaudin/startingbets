import React from 'react';
import { connect } from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import Header from '../components/Header.js';

export const AdminRoute = ({
  isAuthenticated, 
  isAdmin,
  component: Component , 
  ...restOfProps
}) => (
  <Route {...restOfProps} component={(props) => ( // props is automatically a function wich receives some props.... 
    isAuthenticated && isAdmin ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )   
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid,
  isAdmin: !!state.auth.isAdmin
});

export default connect(mapStateToProps)(AdminRoute);

