import React from 'react';
import JourneyList from './JourneyList'
import {Link} from 'react-router-dom';


const AdminDashboardPage = () => (
  <div>
    <h2>Dashboard ADMIN</h2>
    <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;    
    <Link to="/admin/journey/1">Journey (vue Admin)</Link> -&nbsp;
    <Link to="/user/journey/1">Journey (vue User)</Link> -&nbsp;
    <Link to="/admin/user/create">Créer un nouveau User</Link> -&nbsp;    
    <JourneyList />
  </div>
)



export default AdminDashboardPage;