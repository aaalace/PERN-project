import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store/store.js'
import Footer from "./components/Footer"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
      <Footer></Footer>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
