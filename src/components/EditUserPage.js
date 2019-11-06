import React from 'react';
import { connect } from 'react-redux';
import {startEditUser, startDisableUser} from '../actions/users';
import UserForm from './admin/UserForm';
import moment from 'moment'

export class EditUserPage extends React.Component {
  constructor(props){    
    super(props);
  }
  
  onSubmit = (user) => {
      console.log('about to edit user',user);
      this.props.startEditUser(this.props.user.id,user);
      this.props.history.push('/');
  }

  onClickDisable = () => {
    this.props.startDisableUser(this.props.user.id);
    console.log('about to disable user',this.props.user);
    this.props.history.push('/');
  }



  render() {    
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">{ this.props.user.status === 'inactive' ? 'Activer un membre' : 'Éditer un membre'} </h2>
          </div>
        </div>
        <div className="content-container">
          <UserForm 
            user={this.props.user}
            onSubmit={this.onSubmit} 
          />
          <button className="button button-secondary" onClick={this.onClickDisable}>Désactiver cet utilisateur</button>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {  
  return {
    user : state.users.find( (user) => (user.id === props.match.params.userid))
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditUser: (id,user) => dispatch(startEditUser(id,user)),  
  startDisableUser: (id) => dispatch(startDisableUser(id))  
});


export default connect(mapStateToProps,mapDispatchToProps)(EditUserPage);
