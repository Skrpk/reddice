import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import jwtDecode from 'jwt-decode';
import authActions from './actions/loginActions';

import routes from './routes';
import rootReducer from './reducers';
import setAuthorizationToken from './utils/setAuthorizationToken';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(authActions.setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
