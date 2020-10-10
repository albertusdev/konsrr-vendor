import React from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import 'firebase/auth';
import 'firebase/database';
import "./tailwind.output.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {login} from "./reducers/authReducer"


function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user){
        history.push("/login");
      } else {
        const vendorProfileDoc = firebase.firestore().collection("vendors").doc(user.uid)
        const userData = { uid: user.uid  }
        vendorProfileDoc.get()
          .then(function(doc) {
            if (!doc.exists) {
              let defaultProfile = { name: user.displayName }
              vendorProfileDoc.set()
              dispatch(login({
                user: userData,
                profile: defaultProfile
              }))
              history.push("/profile")
            } else {
              dispatch(login({
                user: userData,
                profile: doc.data()
              }))
            }
        }).catch((e) => console.log(e));
      }
    });
    return unsubscribe
  }, [dispatch, history]);

  return auth.isLoading ? <div>loading...</div> : (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Tailwind and Create React App
        </h1>
        <p className="text-base text-gray-700 leading-normal">
          Building apps together
        </p>
        <Router>
        <Switch>
          <Route path="/profile"><Profile></Profile></Route>
          <Route path="/login"><Login></Login></Route>
          <Route path="/"><Home></Home></Route>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
