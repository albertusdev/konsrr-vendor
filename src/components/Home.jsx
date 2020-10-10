import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
import { useHistory } from "react-router-dom";


export default function Home() {
  let history = useHistory();

  React.useEffect(() => {
    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user){
        history.push("/login");
      }
    });
    return unsubscribe
  }, [history]);

  return <div>
    <button onClick={() => firebase.auth().signOut()}>logout</button>
    Home
  </div>
}