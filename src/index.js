import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';
import * as serviceWorker from './serviceWorker';
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer';
import { Provider } from 'react-redux'

var app = firebase.initializeApp(
  {
    apiKey: "AIzaSyCZwY8R4zCvSKnEWUwxivUvSFBcNI7-5jU",
    authDomain: "konsrr.firebaseapp.com",
    databaseURL: "https://konsrr.firebaseio.com",
    projectId: "konsrr",
    storageBucket: "konsrr.appspot.com",
    messagingSenderId: "103917595655",
    appId: "1:103917595655:web:53e0f30629531ada1a0ea2",
    measurementId: "G-P6LP8W8FRP"
  }
);
firebase.analytics();

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
