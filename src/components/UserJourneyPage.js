import React from 'react';
import JourneyConversation from './JourneyConversation';
import AddJourneyMessageForm from './AddJourneyMessageForm'
import {Link} from 'react-router-dom';
import BookmakerFundsTable from './BookmakerFundsTable';


const UserJourneyPage = () => (
  <div className='journey-container' >
    <h2>Programme Journey vue USER</h2>
    <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;
    <Link to="/admin/journey/1">Journey (vue Admin)</Link> -&nbsp;
    <Link to="/user/journey/1">Journey (vue User)</Link> -&nbsp;
    <BookmakerFundsTable role="user"/>
    <JourneyConversation role="user"/>
    <AddJourneyMessageForm role="user" />
  </div>
)



export default UserJourneyPage;