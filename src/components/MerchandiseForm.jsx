import React from "react";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import * as firebase from 'firebase';

export default function MerchandiseForm() {
  const auth = useSelector(state => state.auth);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {

    firebase.firestore().collection("merchandises")
      .add({
        description: data.description,
        name: data.name,
        price: parseInt(data.price),
        stock: parseInt(data.stock),
        vendor: firebase.firestore().collection("vendors").doc(auth.user.uid),
        vendorName: auth.profile.name
      })
      .then(async docRef => {
        firebase.storage().ref().child("/merchandise/" + docRef.id).put(data.picture[0])
        }
      )
  };

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
      <input placeholder="Merchandise Name" className="text-2xl outline-none mb-2" name="name" ref={register}></input>
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Description</label>
        <textarea rows="3" className="px-1 outline-none border-gray-500 border-solid border-2" name="description" ref={register}></textarea>
      </div>

      <div className="flex">
        <div>
          <label>Stock</label>
          <input name="stock" ref={register}></input>
        </div>

        <div>
          <label>Price</label>
          <input name="price" ref={register}></input>
        </div>
      </div>

      <label>Picture</label>
      <input name="picture" ref={register} type="file"></input>

      <div>
        <input type="submit" value="Add Merchandise"></input>
      </div>
    </form>
  </div>
}
