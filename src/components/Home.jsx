import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';

export default function Home() {
  return <div>
    <button onClick={() => firebase.auth().signOut()}>logout</button>
    Home
    
  </div>
}