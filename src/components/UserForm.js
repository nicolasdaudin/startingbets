import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import {JOURNEY_PROGRAM_TYPES} from '../constants.js';
import {BOOKMAKERS} from '../constants.js';



const now = moment();
export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    // let bookmakers = {};
    // if (props.user) { 
    //   bookmakers = BOOKMAKERS.reduce((bookmakers,bookmaker) => ({ ...bookmakers, [bookmaker]: props.user.bookmakers.hasOwnProperty(bookmaker)}),{})  
    // } else {
    //   bookmakers = BOOKMAKERS.reduce((bookmakers,bookmaker) => ({ ...bookmakers, [bookmaker]: true }),{});
    // }
    // console.log(bookmakers);

    this.state = {
      name : props.user ? props.user.name : '',
      email : props.user ? props.user.email : '',
      programType : props.user ? props.user.programType : JOURNEY_PROGRAM_TYPES[0].type,
      goal : props.user ? (props.user.goal).toString() : '',
      //bookmakers : props.user ? props.user.bookmakers : '',
      bookmakers : BOOKMAKERS.reduce((bookmakers,bookmaker) => ({ ...bookmakers, [bookmaker]: props.user ? props.user.bookmakers.hasOwnProperty(bookmaker) : true}),{}),
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
    const bookmaker = e.target.value;
    this.setState((prevState) => { 
      const obj = { bookmakers : {
        ...prevState.bookmakers,
        [bookmaker] : !prevState.bookmakers[bookmaker]
      }}
      return obj;
    });

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


    if (!this.state.name || !this.state.email || !Object.values(this.state.bookmakers).find(checked => checked)   || !this.state.goal || !this.state.programType){
      this.setState(() => ({error: `Vous devez renseigner le nom, l'email, l'objectif de gain, le type de programme et au moins cocher un bookmaker`}));

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)){ 
      this.setState(() => ({error : `L'email n'est pas valide`}));      
    } else {
      this.setState(() => ({error : ''}));

      let user = {  
        name:this.state.name,
        email:this.state.email,
        disabled:this.state.disabled        
      };
      if (!this.state.disableFields) { 
        // creation mode
        // we also add goal, programType, programBeginDate, bookmakers
        user = {
          ...user,
          programType:this.state.programType,
          goal:parseFloat(this.state.goal,10),
          bookmakers:this.state.bookmakers,
          programBeginDate:this.state.programBeginDate.valueOf() // la valeur en milliseconds
        }
      }
      this.props.onSubmit(user);
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
        
        <label>Bookmakers autorisés</label>
        <div>          
          {BOOKMAKERS.map((bookmaker) => { 
            return (
              <label key={bookmaker}>
                <input                               
                  type="checkbox" 
                  disabled={this.state.disableFields}
                  className="bookmaker-checkbox"
                  checked={this.state.bookmakers[bookmaker]}
                  value={bookmaker}
                  onChange={this.onBookmakersChange}
                />
                <span>{bookmaker}</span>
              </label>
            )})}
        </div>
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
