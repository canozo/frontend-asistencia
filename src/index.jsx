
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainRouter from './MainRouter';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
