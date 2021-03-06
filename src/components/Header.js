import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {startLogout } from '../actions/auth';

export const Header = ({startLogout}) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/admin/dashboard" >
          <h1>Starting Bets</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout : () => dispatch(startLogout())
})

export default connect(undefined,mapDispatchToProps)(Header);

// <header>
// <h1>Expensify</h1>
// <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink> -&nbsp;
// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink> -&nbsp;
// <button onClick={startLogout}>Logout</button>
// </header>