import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
import { useHistory } from "react-router-dom";
import { setProfile } from "../reducers/authReducer"
import { useSelector, useDispatch } from "react-redux";




export default function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  console.log(auth)

  function handleSubmit(e) {
    e.preventDefault();

    firebase.firestore().collection("vendors").doc(auth.user.uid).set(auth.profile)

  }

  return <div>
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input onChange={e => dispatch(setProfile({
        ...auth.profile,
        name: auth.profile.name
      }))} value={auth.profile.name}></input>
      <input type="submit" value="Save"></input>
    </form>
  </div>
}