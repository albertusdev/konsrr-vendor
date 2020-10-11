import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';

export default function Home() {
  return <div>
    <button className="text-white" onClick={() => firebase.auth().signOut()}>logout</button>
    Home
    <h1>Create concert</h1>
  </div>
}