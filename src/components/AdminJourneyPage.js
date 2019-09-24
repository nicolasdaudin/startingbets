import React from 'react';
import JourneyConversation from './JourneyConversation';
import AddJourneyMessageForm from './AddJourneyMessageForm'
import {Link} from 'react-router-dom';
import BookmakerFundsTable from './BookmakerFundsTable';
import BookmakerActivationTable from './BookmakerActivationTable';
import EarningsCalculationTable from './EarningsCalculationTable';
import { connect } from 'react-redux';


export  class AdminJourneyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betType : 'simple'
    }
  }

  updateBetType = (betType) => {
    this.setState({
      betType
    });
  }

  render () {
    return (
      <div>
        <h2>Programme Journey vue ADMIN</h2>
        <h3>Nom: {this.props.user.name} - Email: {this.props.user.email}</h3>
        <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;
        <Link to="/admin/journey/2">Journey (vue Admin)</Link> -&nbsp;
        <Link to="/user/journey/2">Journey (vue User)</Link> -&nbsp;    
        <div className='journey-container'>
          <div className='conversation-container'>
            <JourneyConversation userid={this.props.user.id} role="admin"/>
            <AddJourneyMessageForm userid={this.props.user.id} role="admin" updateBetType={this.updateBetType}/>
          </div>
          <div className='bookmaker-data-container'>
            <BookmakerFundsTable userid={this.props.user.id}  role="admin"/>
            <BookmakerActivationTable userid={this.props.user.id}  role="admin"/>        
            {this.state.betType === 'bet' && <EarningsCalculationTable role="admin"/>}
          </div>
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

export default connect(mapStateToProps)(AdminJourneyPage);
