import React from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import Logo from "./Logo";
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

  return <div className="flex flex-col items-center justify-center h-screen">
  <div className="flex flex-col items-center mb-6"><Logo/><h1 className="text-3xl">Organizer App</h1></div>
    <button  className="border-white border-solid border-2 rounded px-4 py-2 text-white" onClick={handleLogin}>Sign in with Google</button>
  </div>
}