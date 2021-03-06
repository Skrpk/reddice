import React from 'react'
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    timezone: '',
    errors: {},
    isLoading: false,
    invalid: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;

    if (val !== '') {
      this.props.isUserExists(val)
        .then((res) => {
          let errors = this.state.errors;
          let invalid;
          if (res.data.user) {
            errors[field] = 'There is user with such ' + field;
            invalid = true;
          } else {
            errors[field] = '';
            invalid = false;
          }

          this.setState({ errors, invalid });
        });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(() => {
            this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully',
          });
          this.context.router.push('/');
        })
        .catch((e) =>
          this.setState({ errors: e.response.data, isLoading: false, }));
    }
  }

  render() {
    const { errors } = this.state;

    const options = map(timezones, (val, key) =>
      <option value={val} key={Math.random(key)}>{val}</option>
    );
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community</h1>

          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.username}
            field="username"
          />

          <TextFieldGroup
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
          />

          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
          />

          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="Password Confirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            field="passwordConfirmation"
            type="password"
          />

        <div
          className={classnames('form-group', { 'has-error': errors.timezone })}
        >
          <label className="control-label">Timezone</label>
          <select
            name="timezone"
            className="form-control"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>Choose your timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default SignupForm;
