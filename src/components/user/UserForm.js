import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';



const now = moment();
export class UserForm extends React.Component {
  constructor(props) {
    super(props);

    //console.log('constructor UserForm');


    this.state = {
      name : props.user ? props.user.name : '',
      email : props.user ? props.user.email : '',
      password: props.user ? props.user.password : '', 
      
      // !!!!! WE HAVE TWICE THE PASSWORD FIELD !!! Probably an issue ;-) 
      
      
      
      //programType : props.user ? props.user.programType : JOURNEY_PROGRAM_TYPES[0].type,
      //goal : props.user ? (props.user.goal).toString() : '',
      //bookmakers : BOOKMAKERS.reduce((bookmakers,bookmaker) => ({ ...bookmakers, [bookmaker]: props.user ? props.user.bookmakers.hasOwnProperty(bookmaker) : true}),{}),
      //programBeginDate : props.user ? moment(props.user.programBeginDate) : moment(),
      //calendarFocused: false,
      disableFields: !!props.user ? "disabled" : "",
      error : props.error ? props.error : '',
      password: '',
      passwordCheck : '',
      //disabled : props.user ? props.user.disabled : false,
    }
  }

  // Still necessary now that we have AUTH PERSIST ????
  componentDidUpdate(prevProps) {
    //console.log('componentDidUpdate UserForm')
    if (prevProps.user && this.props.user.id !== prevProps.user.id){
      //to handle refresh of the page and not lose ALL data
      // enters this 'if' only when updating with a refresh on the complete page
      console.log('executing state update -  UserForm')
      this.setState(() => ({
        name : this.props.user ? this.props.user.name : '',
        email : this.props.user ? this.props.user.email : '',
        password: this.props.user ? this.props.user.password : '',
        //programType : this.props.user ? this.props.user.programType : JOURNEY_PROGRAM_TYPES[0].type,
        //goal : this.props.user ? (this.props.user.goal).toString() : '',
        //bookmakers : BOOKMAKERS.reduce((bookmakers,bookmaker) => ({ ...bookmakers, [bookmaker]: this.props.user ? this.props.user.bookmakers.hasOwnProperty(bookmaker) : true}),{}),
        //programBeginDate : this.props.user ? moment(this.props.user.programBeginDate) : moment(),
        //calendarFocused: false,
        disableFields: !!this.props.user ? "disabled" : "",
        error : '',
        //disabled : this.props.user ? this.props.user.disabled : false,
        //role: 'user'
      }))
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

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
  }

  onPasswordCheckChange = (e) => {
    const passwordCheck = e.target.value;
    this.setState(() => ({passwordCheck}));
  }
  
  

  onSubmit = (e) => {
    e.preventDefault();


    if (!this.state.name || !this.state.email || !this.state.password){
      this.setState(() => ({error: `Vous devez renseigner le nom, l'email et le mot de passe`}));

    } else if (this.state.password !== this.state.passwordCheck) {
      this.setState(() => ({error: `Les deux mots de passe ne sont pas identiques`}));
    } else if (!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      this.setState(() => ({error: `Le mot de passe ne respecte pas les conditions : entre 6 et 20 caractères, au moins un chiffre, une minuscule et une majuscule`}));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)){ 
      this.setState(() => ({error : `L'email n'est pas valide`}));      
    } else {
      this.setState(() => ({error : ''}));

      this.props.onSubmit({  
        name:this.state.name,
        email:this.state.email,
        password: this.state.password,
        status:'inactive',
        disabled:false

      });
    }
  }

  render () {
    //console.log('render UserForm');
    //console.log('user props',this.props.user);
    return (        
      <form className="form" onSubmit={this.onSubmit}>
        { !this.state.error && this.props.authError && <p className="form__error">{this.props.authError.message}</p>}
        { this.state.error && <p className="form__error">{this.state.error}</p>}
        <label>Prénom</label>
        <input 
          type="text" 
          placeholder="Prénom" 
          disabled={this.state.disableFields}
          autoFocus
          className="text-input"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input 
          type="text" 
          placeholder="Email" 
          disabled={this.state.disableFields}
          className="text-input"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        
        <input 
          type="text" 
          placeholder="Mot de passe" 
          className="text-input"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <input 
          type="text"           
          placeholder="Vérifier mot de passe" 
          className="text-input"
          value={this.state.passwordCheck}
          onChange={this.onPasswordCheckChange}
        />
        <div>
          <button className="button">Sauvegarder</button>
        </div>
      </form>
    ) 
  }
}

const mapStateToProps = (state) => ({
  authError : state.auth.error
})

export default connect(mapStateToProps)(UserForm);
