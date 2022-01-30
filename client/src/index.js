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
<<<<<<< HEAD
      {/* <Footer></Footer> */}
=======
      <Footer></Footer>
>>>>>>> 13a0ec02914e8b11af9a38dad88b88e53eaf94aa
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
