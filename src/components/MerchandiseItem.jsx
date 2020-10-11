import React from "react";
import * as firebase from "firebase";
import FirebaseStorageImg from "./FirebaseStorageImg";

export default function MerchandiseItem({merchandise}) {
  const {name, stock, price, description, id} = merchandise;

  return <div className="bg-white mr-2 w-1/5 mb-4 rounded">
    <FirebaseStorageImg height="200" src={firebase.storage().ref().child("/merchandise/" + id)}></FirebaseStorageImg>
    <div className="p-3 border-gray-500 border-solid border-2 border-t-0">
    <h3 className="font-bold">{name}</h3>
      {stock > 0 ? <div>{stock} left</div> : <div className="text-red-500">Out of stock</div>}
      <div>IDR {price.toLocaleString()}</div>
    </div>
  </div>
}