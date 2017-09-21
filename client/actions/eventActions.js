import axios from 'axios';

const createEvent = event => dispatch =>
  axios.post('/api/events', event);

export default {
  createEvent,
};
