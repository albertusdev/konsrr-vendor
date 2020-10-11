import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
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
    <h3 class="text-xl mb-2">Profile</h3>
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <label className="mr-2">Name: </label>
        <input onChange={e => dispatch(setProfile({
          ...auth.profile,
          name: e.target.value
        }))} value={auth.profile.name}></input>
      </div>
      <div>
        <input type="submit" value="Save"></input>
      </div>
    </form>
  </div>
}