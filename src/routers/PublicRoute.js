import React from 'react';
import { connect } from 'react-redux';
import {Route,Redirect} from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated, 
  isAdmin,
  component: Component , 
  ...restOfProps
}) => (
  <Route {...restOfProps} component={(props) => (
    isAuthenticated ? 
      ( isAdmin ? 
        (
          <div>
            <Redirect to="/admin/dashboard" />        
          </div>
        ) : (
          <div>
            <Redirect to="/user/dashboard" />        
          </div>
        )
      ) : (
        <Component {...props} />
      )   
  )}/>
);

const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid,
  isAdmin: !!state.auth.isAdmin
});

export default connect(mapStateToProps)(PublicRoute);

