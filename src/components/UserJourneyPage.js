import React from 'react';
import JourneyConversation from './JourneyConversation';
import AddJourneyMessageForm from './AddJourneyMessageForm'
import {Link} from 'react-router-dom';
import BookmakerFundsTable from './BookmakerFundsTable';
import { connect } from 'react-redux';


export class UserJourneyPage extends React.Component {  
  constructor(props) {
    super(props);
  }
  
  
  render () {
    return (
      <div>
        <h2>Bienvenue {this.props.user.name}</h2>
        <h4>Autres infos - Email: {this.props.user.email}</h4>
        <Link to="/user/dashboard">Dashboard USER</Link> -&nbsp;
        <Link to={`/user/journey/${this.props.user.id}`}>Programme (vue User)</Link> -&nbsp;
        <div className='journey-container'>
          <div>
            <JourneyConversation userid={this.props.user.id} role="user"/>
            <AddJourneyMessageForm userid={this.props.user.id} role="user" />
          </div>
          <BookmakerFundsTable userid={this.props.user.id} role="user"/>
        </div>   
      </div>
    )
  }
}


const mapStateToProps = (state,props) => {
  return {
    //user : state.users.find( (user) => (user.id === props.match.params.userid))
    user : state.users.find( (user) => (user.id === state.auth.uid))
  }
}

export default connect(mapStateToProps)(UserJourneyPage);
