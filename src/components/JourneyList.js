import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';



const journeys = [
  { name : 'Kevin', email: 'kevin@gmail.com', programType: '350 FR', programBeginDate : '27/07/2018', lastAction: 'Attente Prise de Paris', lastActionDate:'29/07/2018',goalDistance:'250'},
  { name : 'Nico', email: 'nicolas.daudin@gmail.com', programType: '350 FR', programBeginDate : '02/01/2017', lastAction: 'Attente Validation Code ', lastActionDate:'15/07/2019',goalDistance:'150'}
] 

const JourneyList = () => (
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
          <TableCell>Distance objectif</TableCell>
          <TableCell>Voir programme (vue Admin)</TableCell>
          <TableCell>Voir programme (vue Membre)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {journeys.map( (journey) => (
          <TableRow key={journey.name}>
            <TableCell>{journey.name}</TableCell>
            <TableCell>{journey.email}</TableCell>
            <TableCell>{journey.programType}</TableCell>
            <TableCell>{journey.programBeginDate}</TableCell>
            <TableCell>{journey.lastAction}</TableCell>
            <TableCell>{journey.lastActionDate}</TableCell>
            <TableCell>{journey.goalDistance}</TableCell>
            <TableCell><Link to="/admin/journey/1">Journey (vue Admin)</Link></TableCell>
            <TableCell>Lien</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>

)


export default JourneyList;