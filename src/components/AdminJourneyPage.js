import React from 'react';
import JourneyConversation from './JourneyConversation';
import AddJourneyMessageForm from './AddJourneyMessageForm'
import {Link} from 'react-router-dom';
import BookmakerFundsTable from './BookmakerFundsTable';
import BookmakerActivationTable from './BookmakerActivationTable';
import EarningsCalculationTable from './EarningsCalculationTable';


export default class AdminJourneyPage extends React.Component {
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
        <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;
        <Link to="/admin/journey/1">Journey (vue Admin)</Link> -&nbsp;
        <Link to="/user/journey/1">Journey (vue User)</Link> -&nbsp;    
        <div className='journey-container'>
          <div className='conversation-container'>
            <JourneyConversation role="admin"/>
            <AddJourneyMessageForm role="admin" updateBetType={this.updateBetType}/>
          </div>
          <div className='bookmaker-data-container'>
            <BookmakerFundsTable role="admin"/>
            <BookmakerActivationTable role="admin"/>        
            {this.state.betType === 'bet' && <EarningsCalculationTable role="admin"/>}
          </div>
        </div>
      </div>
    );
  }
}