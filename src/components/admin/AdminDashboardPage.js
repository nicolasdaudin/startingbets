import React from 'react';
import ActiveJourneyList from './ActiveJourneyList'
import InactiveJourneyList from './InactiveJourneyList'
import {Link} from 'react-router-dom';


export default class AdminDashboardPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <div>
        <h2>Dashboard ADMIN</h2>
        <Link to="/admin/dashboard">Dashboard ADMIN</Link> -&nbsp;   
        <ActiveJourneyList/>
        <InactiveJourneyList/>
        
      </div>
    )
  }
}