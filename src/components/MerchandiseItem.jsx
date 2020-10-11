import React from "react";
import * as firebase from "firebase";
import FirebaseStorageImg from "./FirebaseStorageImg";

export default function MerchandiseItem({merchandise}) {
  const {name, stock, price, description, id} = merchandise;

  return <div>

    <h3>{name}</h3>
    <p>{description}</p>
    <div>
      <div>Stock: {stock}</div>
      <div>Price: {price}</div>
    </div>
    <FirebaseStorageImg src={firebase.storage().ref().child("/merchandise/" + id)}></FirebaseStorageImg>
  </div>
}