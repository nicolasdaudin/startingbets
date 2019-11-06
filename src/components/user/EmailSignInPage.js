import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {startSignInUser} from '../../actions/auth';



const now = moment();
export class EmailSignInPage extends React.Component {
  constructor(props) {
    super(props);

    //console.log('constructor UserForm');


    this.state = {
      email : props.user ? props.user.email : '',
      password: props.user ? props.user.password : '',
      error : props.error ? props.error : ''
    }
  }
  
  
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
  }
  
  

  onSubmit = (e) => {
    e.preventDefault();


    if (!this.state.email || !this.state.password){
      this.setState(() => ({error: `Vous devez renseigner l'email et le mot de passe`}));

    } else {
      this.setState(() => ({error : ''}));

      this.props.startSignInUser({  
        email:this.state.email,
        password: this.state.password
      });
    }
  }

  render () {
    //console.log('render UserForm');
    //console.log('user props',this.props.user);
    return (        
      <div className="page-header">
        <div className="content-container">
        <h1 className="page-header__title">Connecte-toi sur Starting Bets !!</h1>
          <form className="form" onSubmit={this.onSubmit}>
            { !this.state.error && this.props.authError && <p className="form__error">{this.props.authError.message}</p>}
            { this.state.error && <p className="form__error">{this.state.error}</p>}
            
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
            <div>
              <button className="button">Se connecter</button>
            </div>
          </form>
        </div>
      </div>
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignInUser : (user) => dispatch(startSignInUser(user))  
})

const mapStateToProps = (state) => ({
  authError : state.auth.error
})

export default connect(mapStateToProps,mapDispatchToProps)(EmailSignInPage);
