import React from 'react';
import * as firebase from 'firebase';
import { Router, Route, Switch } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateConcert from "./components/CreateConcert";
import 'firebase/auth';
import 'firebase/database';
import "./tailwind.output.css";
import { useDispatch, useSelector } from 'react-redux'
import {login, logout} from "./reducers/authReducer"
import {createBrowserHistory} from 'history';

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
                joined_date: firebase.database.ServerValue.TIMESTAMP
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
            // firebase.firestore().collection("merchandises")
            //   .where("vendor", "==", firebase.firestore().collection('vendors').doc(user.uid))
            //   .get()
            //   .then(function(querySnapshot) {
            //       querySnapshot.forEach(function(doc) {
            //           // doc.data() is never undefined for query doc snapshots
            //           console.log(doc.id, " => ", doc.data());
            //       });
            //   })
            //   .catch(function(error) {
            //       console.log("Error getting documents: ", error);
            //   });
            if (!doc.exists)  {
              history.push("/profile")
            }
        }).catch((e) => console.log(e));
      }
    });
    return unsubscribe
  }, [dispatch]);

  return auth.isLoading ? <div className="text-white">loading...</div> : (
    <div className="mx-auto flex p-6 bg-primary-2 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <Router history={history}>
        <Switch>
          <Route path="/profile"><Profile></Profile></Route>
          <Route path="/login"><Login></Login></Route>
          <Route path="/"><Home></Home></Route>
          <Route path="/create-concert"><CreateConcert /></Route>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
