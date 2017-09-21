import isEmpty from 'lodash/isEmpty';

import constants from '../constants/auth';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case constants.SET_CURRENT_USER: {
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      }
    }
    default:
      return state;
  }
}
