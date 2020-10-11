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
        vendor: firebase.firestore().collection("vendors").doc(auth.user.uid)
      })
      .then(async docRef => {
        firebase.storage().ref().child("/merchandise/" + docRef.id).put(data.picture[0])
        }
      )
  };

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <label>Name</label>
      <input name="name" ref={register}></input>
      </div>

      <div>
      <label>Description</label>
      <input name="description" ref={register}></input>
      </div>

      <div>
      <label>Stock</label>
      <input name="stock" ref={register}></input>
      </div>

      <div>
      <label>Price</label>
      <input name="price" ref={register}></input>
      </div>

      <label>Picture</label>
      <input name="picture" ref={register} type="file"></input>

      <div>
        <input type="submit" value="Add Merchandise"></input>
      </div>
    </form>
  </div>
}
