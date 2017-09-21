import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import flashMessagesActions from '../actions/flashMessages';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
         this.props.addFlashMessage({
           type: 'error',
           text: 'You need to login to access this page',
         });

         this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  }

  const mapStateToProps = store => ({
    isAuthenticated: store.auth.isAuthenticated,
  });

  const mapDispatchToProps = dispatch => ({
    addFlashMessage: (data) => dispatch(flashMessagesActions.addFlashMessage(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
