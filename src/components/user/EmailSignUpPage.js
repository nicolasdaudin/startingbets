import React from 'react';
import { connect } from 'react-redux';
import {startSignUpUser} from '../../actions/auth';
import UserForm from './UserForm';

export class EmailSignUpPage extends React.Component {
  onSubmit = (user) => {
    this.props.startSignUpUser(user);   
  };

  render() {
    return(
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Starting Bets ⚽️🏀🏉🥎🎾</h1>
          <h2>Inscrivez-vous !!!</h2>
        </div>
        <div className="content-container">
          <UserForm onSubmit={this.onSubmit} />
        </div>        
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  startSignUpUser : (user) => dispatch(startSignUpUser(user))  
})

export default connect(undefined,mapDispatchToProps)(EmailSignUpPage);