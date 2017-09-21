import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import eventActions from '../../actions/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {
  state = {
    title: '',
    errors: {},
    isLoading: false
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render() {
    const { title, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          label="Event Title"
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
}

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({
  createEvent: () => dispatch(eventActions.createEvent()),
});

export default connect(null, mapDispatchToProps)(EventForm);
