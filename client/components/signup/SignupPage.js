import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import signupActions from '../../actions/signupActions';
import flashMessagesActions from '../../actions/flashMessages';
import PropTypes from 'prop-types';

class SignupPage extends React.Component {
  render() {
    const {
      userSignupRequest,
      addFlashMessage,
      isUserExists,
    } = this.props;

    return (<div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignupForm
          isUserExists={isUserExists}
          userSignupRequest={userSignupRequest}
          addFlashMessage={addFlashMessage}
        />
      </div>
    </div>);
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({
  userSignupRequest: (userData) =>
    dispatch(signupActions.userSignupRequest(userData)),
  addFlashMessage: (message) =>
    dispatch(flashMessagesActions.addFlashMessage(message)),
  isUserExists: (identifier) =>
    dispatch(signupActions.isUserExists(identifier)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
