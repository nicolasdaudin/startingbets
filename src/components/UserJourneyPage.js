import React from 'react';
import JourneyConversation from './JourneyConversation';
import AddJourneyMessageForm from './AddJourneyMessageForm'
import {Link} from 'react-router-dom';
import BookmakerFundsTable from './BookmakerFundsTable';


const UserJourneyPage = () => (
  <div>
    <h2>Programme Journey vue USER</h2>
    <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;
    <Link to="/admin/journey/1">Journey (vue Admin)</Link> -&nbsp;
    <Link to="/user/journey/1">Journey (vue User)</Link> -&nbsp;
    <div className='journey-container'>
      <div>
        <JourneyConversation role="user"/>
        <AddJourneyMessageForm role="user" />
      </div>
      <BookmakerFundsTable role="user"/>
    </div>   
  </div>
)



export default UserJourneyPage;