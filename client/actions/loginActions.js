import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

import constants from '../constants/auth';

const setCurrentUser = user => {
  return {
    type: constants.SET_CURRENT_USER,
    user,
  }
}

const login = data => (dispatch) => {
  return axios.post('/api/auth', data)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    })
};

const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
}

export default {
  login,
  setCurrentUser,
  logout,
};
