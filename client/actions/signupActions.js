import axios from 'axios';

const userSignupRequest = userData => dispatch => {
  return axios.post('/api/users', userData);
}

const isUserExists = identifier => dispatch => {
  return axios.get(`/api/users/${identifier}`)
}

export default {
  userSignupRequest,
  isUserExists,
};
