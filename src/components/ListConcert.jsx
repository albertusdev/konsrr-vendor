import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as firebase from "firebase";
import ConcertCard from "./ConcertCard";
import { Link } from "react-router-dom";

const ListConcert = () => {
  const auth = useSelector((state) => state.auth);
  const store = firebase.firestore();
  const dispatch = useDispatch();
  const [concerts, setConcerts] = useState([]);

  let items = [];
  useEffect(() => {
    store
      .collection("concerts")
      .where(
        "vendor.reference",
        "==",
        store.collection("vendors").doc(auth.user.uid)
      )
      .get()
      .then(function (querySnapshot) {
        querySnapshot.docs.forEach((doc) => {
          const { vendor, ...rest } = doc.data();
          let newObject = { ...rest, id: doc.id };
          items.push(newObject);
        });
        setConcerts(items);
      });
  }, [auth.user, dispatch, items, store]);

  return (
    <div className="flex flex-row">
      <div className="w-1/3">
        <Link to="/create-concert">
          <div
            className="bg-white flex flex-col justify-center items-center p-4 mr-4 h-64"
            style={{ height: "392px" }}
          >
            <h1 className="text-xl text-black">Create New Concert</h1>
            <h1 className="text-4xl text-black">+</h1>
          </div>
        </Link>
      </div>
      {concerts.length === 0
        ? "Loading..."
        : concerts.map((concert) => (
            <ConcertCard imageUrl={concert.imageUrl} name={concert.name} />
          ))}
    </div>
  );
};

export default ListConcert;
