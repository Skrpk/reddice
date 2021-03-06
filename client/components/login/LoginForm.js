import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loginActions from '../../actions/loginActions';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';

class LoginForm extends React.Component {
  state = {
    identifier: '',
    password: '',
    errors: {},
    isLoading: false,
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state)
        .then((res) => {
          this.context.router.push('/');
        })
        .catch((error) => {
          this.setState({ errors: error.response.data.errors, isLoading: false });
        });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />
        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />
      <div className="form-group">
        <button
          className="btn btn-primary btn-lg"
          disabled={isLoading}
        >Login</button>
      </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(loginActions.login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
