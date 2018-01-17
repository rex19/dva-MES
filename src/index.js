import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
// import configureStore from './store/configureStore';
import store from './store/configureStore';  // redux store
import './index.css';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';

// const store = configureStore();

// let token = localStorage.getItem('token');
// if (token !== null) {
//     store.dispatch(loginUserSuccess(token));
// }


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
