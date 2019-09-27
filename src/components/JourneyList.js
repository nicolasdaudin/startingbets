import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {JOURNEY_PROGRAM_TYPES} from '../constants.js';
import {startSetUsers} from '../actions/users.js';



const journeys = [
  { name : 'Kevin', email: 'kevin@gmail.com', programType: '350 FR', programBeginDate : '27/07/2018', lastAction: 'Attente Prise de Paris', lastActionDate:'29/07/2018',goalDistance:'250'},
  { name : 'Nico', email: 'nicolas.daudin@gmail.com', programType: '350 FR', programBeginDate : '02/01/2017', lastAction: 'Attente Validation Code ', lastActionDate:'15/07/2019',goalDistance:'150'}
] 

export class JourneyList extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      showDisabled : false
    }   
  }

  onToggleDisabled = () => {
    this.props.startSetUsers(!this.state.showDisabled);
    this.setState( () => ({showDisabled : !this.state.showDisabled}));
  }

  render() {
     return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type du programme</TableCell>
                <TableCell>Début programme</TableCell>
                <TableCell>Dernière action</TableCell>
                <TableCell>Date dernière action</TableCell>
                <TableCell>Objectif</TableCell>
                <TableCell>Distance Objectif</TableCell>
                <TableCell>Voir programme (vue Admin)</TableCell>
                <TableCell>Voir programme (vue Membre)</TableCell>
                <TableCell>Éditer/Supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.map( (journey) => (
                <TableRow key={journey.id}>              
                  <TableCell>{journey.name}</TableCell>
                  <TableCell>{journey.email}</TableCell>
                  <TableCell>{JOURNEY_PROGRAM_TYPES.find( program =>  journey.programType === program.type).label}</TableCell>
                  <TableCell>{moment(journey.programBeginDate).format("Do MMMM YYYY")}</TableCell>
                  <TableCell>{journey.lastAction}</TableCell>
                  <TableCell>{journey.lastActionDate}</TableCell>
                  <TableCell>{journey.goal} €</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{journey.disabled ? '' : <Link to={`/admin/journey/${journey.id}`}>Programme (vue Admin)</Link>}</TableCell>
                  <TableCell>{journey.disabled ? '' : <Link to={`/user/journey/${journey.id}`}>Programme (vue User)</Link>}</TableCell>
                  <TableCell>{journey.disabled ? 'Membre désactivé' : <Link to={`/admin/user/edit/${journey.id}`}>Éditer/Désactiver</Link>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <button onClick={this.onToggleDisabled}>{this.state.showDisabled ? 'Cacher les membres désactivés' : 'Montrer les membres désactivés'}</button>
      </div>
    );
  }
}



const mapStateToProps = (state,props) => {
  console.log('mapStateToProps JourneyList');
  return { 
    users : state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetUsers: (showDisabled) => dispatch(startSetUsers(showDisabled))
});


export default connect(mapStateToProps,mapDispatchToProps)(JourneyList);