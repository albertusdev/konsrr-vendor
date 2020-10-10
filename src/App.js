import React from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import 'firebase/auth';
import 'firebase/database';


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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login"><Login></Login></Route>
          <Route path="/"><Home></Home></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
