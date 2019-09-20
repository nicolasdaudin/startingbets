import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import {JOURNEY_PROGRAM_TYPES} from '../constants.js';



const now = moment();
export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : props.user ? props.user.name : '',
      email : props.user ? props.user.email : '',
      programType : props.user ? props.user.programType : JOURNEY_PROGRAM_TYPES[0].type,
      goal : props.user ? (props.user.goal).toString() : '',
      bookmakers : props.user ? props.user.bookmakers : '',
      programBeginDate : props.user ? moment(props.user.programBeginDate) : moment(),
      calendarFocused: false,
      disableFields: !!props.user ? "disabled" : "",
      error : '',
      disabled : props.user ? props.user.disabled : false
    }
  }
  
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({name}));
  }
  
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
  }
  
  onProgramTypeChange = (e) => {
    const programType = e.target.value;
    const goal = JOURNEY_PROGRAM_TYPES.find( program =>  programType === program.type).default_goal;
    this.setState(() => ({programType,goal} ));
  } 

  onBookmakersChange = (e) => {
    const bookmakers = e.target.value;
    this.setState(() => ({bookmakers} ));
  } 
  
  onGoalChange = (e) => {
    const goal = e.target.value;
    if (!goal || goal.match(/^\d{1,}(\.\d{0,2})?$/)){ // !amount allows the user to clear the value
      this.setState(() => ({goal}));
    }
    
  }

  onDateChange = (programBeginDate) => {
    console.log('ondatechange:', programBeginDate);
    if (programBeginDate) {
      this.setState(() => ({programBeginDate}))
    }
  }

  onFocusChange = ({focused}) => {
    this.setState (() => ({calendarFocused : focused}));
  }

  onSubmit= (e) => {
    e.preventDefault();

    if (!this.state.name || !this.state.email || !this.state.bookmakers || !this.state.goal || !this.state.programType){
      this.setState(() => ({error: `Vous devez renseigner le nom, l'email, les bookies autorisés, l'objectif de gain, et le type de programme`}));

    } else {
      this.setState(() => ({error : ''}));
      console.log('user disabled ',this.state.disabled);
      this.props.onSubmit({
        name:this.state.name,
        email:this.state.email,
        programType:this.state.programType,
        goal:parseFloat(this.state.goal,10),
        disabled:this.state.disabled,
        bookmakers:this.state.bookmakers,
        programBeginDate:this.state.programBeginDate.valueOf() // la valeur en milliseconds
      });
    }

    

  }

  render () {
    return (        
      <form className="form" onSubmit={this.onSubmit}>
        { this.state.error && <p className="form__error">{this.state.error}</p>}
        <label>Prénom</label>
        <input 
          type="text" 
          placeholder="Prénom" 
          autoFocus
          className="text-input"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input 
          type="text" 
          placeholder="Email (juste du texte pour l'instant)" 
          className="text-input"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <select 
          disabled={this.state.disableFields}
          className="text-input"
          onChange={this.onProgramTypeChange} // quand le tpe change on devrait changer la valeur de Objectif par défaut non ?
        >
          { JOURNEY_PROGRAM_TYPES.map( (program) => (<option key={program.type} selected={(program.type === this.state.programType)? 'selected' : ''} value={program.type}>{program.label}</option>)) }

        </select>
        <input 
          type="text" 
          disabled={this.state.disableFields}
          placeholder="Objectif" 
          className="text-input"
          value={this.state.goal}
          onChange={this.onGoalChange}
        />
        <input 
          type="text" 
          disabled={this.state.disableFields}
          placeholder="Bookmakers autorisés" 
          className="text-input"
          value={this.state.bookmakers}
          onChange={this.onBookmakersChange}
        />
        <label>Date de début de programme</label>
        <SingleDatePicker 
          date={this.state.programBeginDate}
          disabled={!!this.state.disableFields}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
    
        />
        <div>
          <button className="button">Sauvegarder</button>
        </div>
      </form>
    ) 
  }
}
