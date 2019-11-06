import React from 'react';
import { startGoogleLogin } from '../../actions/auth';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

export default class LoginPage extends React.Component {
  
  render() {
   
    return(
      <div className="box-layout"> 
        <div id="menu" className="box-layout__box">
          <h1 className="box-layout__title">Starting Bets ⚽️🏀🏉🥎🎾</h1>
          <p>Gagnez de l'argent facilement grâce à nos paris</p>
          <p><Link to='/user/signin'>Connectez-vous avec votre email</Link></p>
          <p>Pas inscrit? <Link to='/user/signup'>Inscrivez-vous ici</Link></p>
          <p>Admin? <Link to='/admin/signin'>Connexion ADMIN</Link></p>
        </div>       

      </div>
    );
  }
}