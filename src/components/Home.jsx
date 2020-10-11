import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
import CreateConcert from "./CreateConcert";

export default function Home() {
  return <div>
    <button className="text-white" onClick={() => firebase.auth().signOut()}>logout</button>
    Home
    <CreateConcert />
  </div>
}