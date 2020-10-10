import React from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import { useHistory } from "react-router-dom";


export default function Login()  {
  let history = useHistory()

  function handleLogin() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()))
    .then(() => { history.push("/")})
    .catch(function(error) {
      //handle error
    })
  }

  return <div><button onClick={handleLogin}>Sign in with Google</button></div>
}