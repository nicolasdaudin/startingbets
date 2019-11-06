import React from 'react';
import { startGoogleLogin } from '../../actions/auth';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

export class SignInPage extends React.Component {
  
  render() {
   
    return(
      <div className="box-layout"> 
        <div id="menu" className="box-layout__box">
          <h1 className="box-layout__title">Starting Bets ⚽️🏀🏉🥎🎾 - ADMIN</h1>
          <button className="button" onClick={this.props.startGoogleLogin}>Login with Google</button>
        </div>       

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin : () => dispatch(startGoogleLogin())  
})

export default connect(undefined,mapDispatchToProps)(SignInPage);