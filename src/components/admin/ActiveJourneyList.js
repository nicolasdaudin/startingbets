import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {JOURNEY_PROGRAM_TYPES} from '../../constants.js';
import {startSetUsers} from '../../actions/users.js';

import MaterialTable from 'material-table';


const journeyProgramTypes = {};
JOURNEY_PROGRAM_TYPES.map(programType => journeyProgramTypes[programType.type] = programType.label);

const columns = [
  {title: 'Nom', field: 'name'},
  {title: 'Email', field: 'email'},
  {title: 'Type du programme', field: 'programType', lookup : journeyProgramTypes},
  {title: 'Début programme', field : 'programBeginDate', render: journey => moment(journey.programBeginDate).format("Do MMMM YYYY")},
  {title: 'Date dernier message', field : 'lastUserMessageDate', 
    render: 
      journey => {
        return (journey.lastUserMessageDate ? moment(journey.lastUserMessageDate).format("LL LTS") : '').concat(
          !journey.hasOwnProperty('allUserMessagesHaveBeenRead') || journey.allUserMessagesHaveBeenRead ? '' : ' (nouveaux messages!!!)'
          )
      }
  },
  {title: 'Objectif', field : 'goal', render: journey => journey.goal + '€'},
  {title: 'Distance Objectif', field : 'goal', render: journey => journey.goal + '€'},
  {title: 'Voir programme (vue Admin)', field : '', render: journey => journey.status === 'disabled' ? '' : <Link to={`/admin/journey/${journey.id}`}>Programme (vue Admin)</Link>},
  {title: 'Éditer/Supprimer', field : '', render: journey => journey.status === 'disabled' ? 'Membre désactivé' : <Link to={`/admin/user/edit/${journey.id}`}>Éditer/Désactiver</Link>}
];

export class ActiveJourneyList extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      showDisabled : false,
      disableButtonTooltip: 'Montrer les membres désactivés',
      disableIcon : 'visibility'
    }
  }

  onToggleDisabled = () => {
    this.props.startSetUsers(!this.state.showDisabled);
    this.setState( () => ({
      showDisabled : !this.state.showDisabled, 
      disableButtonTooltip: !this.state.showDisabled ? 'Cacher les membres désactivés':'Montrer les membres désactivés',
      disableIcon : !this.state.showDisabled ? 'visibility_off' : 'visibility'   
    }));
  }

  render() {
     return (
      <MaterialTable
        title="Programmes en cours"
        columns={columns}          
        data={this.props.users}
        options={{ 
          // rowStyle does not overwrite MuiTableCell-root, so fontWeight or fontSize does not work since it is used in MuiTableCEll-root. 
          // one option is to use MuiThemeProvider, check
          // the end of https://material-table.com/#/docs/features/styling
          // and https://material-ui.com/styles/advanced/#theming
          rowStyle : journey => ({
            //fontWeight: journey.allUserMessagesHaveBeenRead ? 'normal' : 'bold',
            //backgroundColor: journey.allUserMessagesHaveBeenRead ? 'normal' : 'bolder',
            //fontSize : journey.allUserMessagesHaveBeenRead ? 12 : 34,
            fontStyle : !journey.hasOwnProperty('allUserMessagesHaveBeenRead') || journey.allUserMessagesHaveBeenRead ? 'normal' : 'italic',

          })
        }}
        actions={[
          {
            icon: this.state.disableIcon,
            tooltip: this.state.disableButtonTooltip,
            isFreeAction : true,
            onClick: () => this.onToggleDisabled()
          }
        ]}
      />
    );
  }
}



const mapStateToProps = (state,props) => {
  return { 
    users : state.users.filter(user => user.status !== 'inactive')
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetUsers: (showDisabled) => dispatch(startSetUsers(showDisabled))
});


export default connect(mapStateToProps,mapDispatchToProps)(ActiveJourneyList);