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
        <h2>Programme Journey vue USER</h2>
        <h3>Nom: {this.props.user.name} - Email: {this.props.user.email}</h3>
        <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;
        <Link to="/admin/journey/2">Journey (vue Admin)</Link> -&nbsp;
        <Link to="/user/journey/2">Journey (vue User)</Link> -&nbsp;
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
    user : state.users.find( (user) => (user.id === props.match.params.userid))
  }
}

export default connect(mapStateToProps)(UserJourneyPage);
