import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import loginActions from '../actions/loginActions';

class NavigationBar extends React.Component {
    logout = (e) => {
      e.preventDefault();
      this.props.logout();
    }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/new-event">New Event</Link></li>
        <li><a href="#" onClick={this.logout}>Logout</a></li>
      </ul>
    );

    const guestlinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Red Dice</Link>
          </div>

          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestlinks }
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  auth: store.auth,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(loginActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
