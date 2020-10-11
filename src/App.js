import React from 'react';
import * as firebase from 'firebase';
import { Router, Route, Switch } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import 'firebase/auth';
import 'firebase/database';
import "./tailwind.output.css";
import { useDispatch, useSelector } from 'react-redux'
import {login, logout} from "./reducers/authReducer"
import {createBrowserHistory} from 'history';
import MerchandisePage from './components/MerchandisePage';
import Navbar from "./components/Navbar";

const history = createBrowserHistory()

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(logout())
        history.push("/login");
      } else {
        const vendorProfileDoc = firebase.firestore().collection("vendors").doc(user.uid)
        const userData = { uid: user.uid  }
        vendorProfileDoc.get()
          .then(function(doc) {
            if (!doc.exists) {
              let defaultProfile = { 
                name: user.displayName,                 
                joinedDate: firebase.firestore.Timestamp.now()
              }
              vendorProfileDoc.set(defaultProfile)
              dispatch(login({
                user: userData,
                profile: defaultProfile
              }))
            } else {
              dispatch(login({
                user: userData,
                profile: doc.data(),
              }))
            }
            if (!doc.exists)  {
              history.push("/profile")
            }
        }).catch((e) => console.log(e));
      }
    });
    return unsubscribe
  }, [dispatch]);

  return auth.isLoading ? <div>loading...</div> : (
    <div className="mx-auto p-6">
      <Router history={history}>
        {auth.user ? <Navbar /> : null}
        <Switch>
          <Route path="/profile"><Profile></Profile></Route>
          <Route path="/login"><Login></Login></Route>
          <Route path="/merchandise"><MerchandisePage></MerchandisePage></Route>
          <Route path="/"><Home></Home></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
