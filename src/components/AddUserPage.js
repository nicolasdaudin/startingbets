import React from 'react';
import { connect } from 'react-redux';
import {startAddUser} from '../actions/users';
import UserForm from './user/UserForm';

export  class AddUserPage extends React.Component {
  onSubmit = (user) => {
      this.props.startAddUser(user);
      //console.log('user created at',moment(user.programBeginDate).format("Do MMMM YYYY"))
      this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Ajouter un membre</h2>
          </div>
        </div>
        <div className="content-container">
          <UserForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user))
});


export default connect(undefined,mapDispatchToProps)(AddUserPage);
