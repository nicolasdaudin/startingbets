import React from 'react';
import JourneyConversation from './JourneyConversation';
import AddJourneyMessageForm from './AddJourneyMessageForm'
import {Link} from 'react-router-dom';


const UserJourneyPage = () => (
  <div>
    <h2>Programme Journey vue USER</h2>
    <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;
    <Link to="/admin/journey/1">Journey (vue Admin)</Link> -&nbsp;
    <Link to="/user/journey/1">Journey (vue User)</Link> -&nbsp;
    <JourneyConversation screen="user"/>
    <AddJourneyMessageForm screen="user" />
  </div>
)



export default UserJourneyPage;