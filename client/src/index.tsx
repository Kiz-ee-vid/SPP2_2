import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css'
import App from './App';
import {Provider} from 'react-redux';
import {toast} from "react-toastify";
import {setupStore} from "./store/store";

toast.configure()

const store = setupStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);