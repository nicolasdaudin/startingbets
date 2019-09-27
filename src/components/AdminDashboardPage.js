import React from 'react';
import JourneyList from './JourneyList'
import {Link} from 'react-router-dom';


const AdminDashboardPage = () => (
  <div>
    <h2>Dashboard ADMIN</h2>
    <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;   
    <Link to="/admin/user/create">Créer un nouveau User</Link> -&nbsp;    
    <JourneyList />
  </div>
)



export default AdminDashboardPage;