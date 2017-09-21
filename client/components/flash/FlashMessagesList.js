import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FlashMessage from './FlashMessage';
import FlashMessagesActions from '../../actions/flashMessages';

class FlashMessagesList extends React.Component {
  renderMessages = () =>
    this.props.messages.map(element =>
      (<FlashMessage
        key={element.id}
        message={element}
        deleteFlashMessage={this.props.deleteFlashMessage}
      />)
  )

  render() {
    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  messages: store.flashMessages,
});

const mapDispatchToProps = dispatch => ({
  deleteFlashMessage: (id) =>
    dispatch(FlashMessagesActions.deleteFlashMessage(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessagesList);
