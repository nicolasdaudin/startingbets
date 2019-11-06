import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {JOURNEY_PROGRAM_TYPES} from '../../constants.js';

import MaterialTable from 'material-table';


const journeyProgramTypes = {};
JOURNEY_PROGRAM_TYPES.map(programType => journeyProgramTypes[programType.type] = programType.label);

const columns = [
  {title: 'Nom', field: 'name'},
  {title: 'Email', field: 'email'},
  //{title: 'Type du programme', field: 'programType', lookup : journeyProgramTypes},
  {title: 'Date inscription', field : 'programBeginDate', render: journey => moment(journey.programBeginDate).format("Do MMMM YYYY")},
  {title: 'Activer', field : '', render: journey => <Link to={`/admin/user/edit/${journey.id}`}>Activer</Link>}
];

export class InactiveJourneyList extends React.Component {
  constructor(props){
    super(props); 
  }

  render() {
    if (this.props.users.length > 0){
      return (
        <MaterialTable
          title="Programmes à activer"
          columns={columns}          
          data={this.props.users}
          options={{}}          
        />
      )
    } else {
      return null;
    }
    
  }
}



const mapStateToProps = (state,props) => {
  return { 
    users : state.users.filter(user => user.status === 'inactive')
  }
}

export default connect(mapStateToProps)(InactiveJourneyList);