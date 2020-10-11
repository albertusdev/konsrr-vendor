import React from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import * as firebase from 'firebase';

export default function CreateAds({onSuccess}) {
  const auth = useSelector(state => state.auth)
  const [concerts, setConcerts] = React.useState([])
  const store = firebase.firestore()

  
  React.useEffect(() => {
    store.collection("concerts")
      .where("vendor.reference", "==", store.collection('vendors').doc(auth.user.uid))
      .get()
      .then(function(querySnapshot) {
      setConcerts(querySnapshot.docs.map(doc => {
        const {vendor, ...rest} = doc.data()
        return {...rest, id: doc.id};
      }));
    })
  }, [auth.user.uid, store])

  console.log(concerts)

  const { register, handleSubmit, control, errors } = useForm({defaultValues: {stock: 0, price:0}});

  const onSubmit = (data) => {
    const offset = data.date.getTimezoneOffset()
    const date = new Date(data.date.getTime() - (offset*60*1000)) 

    firebase.firestore().collection("ads")
      .add({
        imageURL: data.imageURL,  
        date: date.toISOString().split('T')[0],
        views: 0,
        clicks: 0,
        numConverted: 0,
        numAddToWishlist: 0,
        concert: firebase.firestore().collection("concerts").doc(concerts[data.concert].id),
        vendor: firebase.firestore().collection("vendors").doc(auth.user.uid),
      })
      .then(async docRef => {
          console.log(data.date)
          onSuccess()
        }
      )
  };



  return <div>
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

    <label className="mr-2 mb-1">Concert</label>
    <select name="concert" ref={register}>
      {concerts.map((concert, idx) => <option value={idx}>{concert.name}</option>)}
    </select>

      <label className="mr-2 mb-1">Image URL</label>
      <div>
        <input name="imageURL" ref={register}></input>
      </div>

      <div className="flex flex-row">
          <div className="flex-1 flex flex-col">
            <label>Date</label>
            <Controller
              name="date"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date"
                />
              )}
            />
          </div>
      </div>

      <div>Fee: IDR 100,000</div>
      <div className="mt-6">
        <input className="p-2" type="submit" value="Create Ad"></input>
      </div>
    </form>
  </div>
}
