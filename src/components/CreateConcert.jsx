import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import * as firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

const CreateConcert = () => {
  const auth = useSelector((state) => state.auth);
  const { register, handleSubmit, control, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("ehehe", data);
    firebase
      .firestore()
      .collection("concerts")
      .add({
        description: data.description,
        name: data.name,
        price: parseInt(data.price),
        stock: parseInt(data.stock),
        vendor: {
          name: auth.profile.name,
          reference: firebase
            .firestore()
            .collection("vendors")
            .doc(auth.user.uid),
        },
        artistName: data.artistName,
        saleEnd: data.saleEnd,
        saleStart: data.saleStart,
        start: data.start,
        end: data.end,
        imageUrl: data.imageUrl,
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-black-1">
      <div className="flex flex-col px-4">
        <h1 className="text-center text-2xl">Create Concert</h1>
        <label className="text-white">Name</label>
        <input name="name" ref={register} className="mb-2" />
        <label className="text-white">Description</label>
        <input name="description" ref={register} className="mb-2" />
        <div className="flex flex-row mb-2">
          <div className="flex-1 flex flex-col">
            <label className="text-white">Concert Start</label>
            <Controller
              name="start"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  showTimeSelect
                  dateFormat="dd MMMM yyyy HH:mm"
                  placeholderText="Select concert's start date"
                />
              )}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white">Concert End</label>
            <Controller
              name="end"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  showTimeSelect
                  dateFormat="dd MMMM yyyy HH:mm"
                  placeholderText="Select concert's end date"
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-row mb-2">
          <div className="flex-1 flex flex-col">
            <label className="text-white">Sale Start</label>
            <Controller
              name="saleStart"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  showTimeSelect
                  dateFormat="dd MMMM yyyy HH:mm"
                  placeholderText="Select sale's start date"
                />
              )}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white">Sale End</label>
            <Controller
              name="saleEnd"
              control={control}
              render={({ onChange, onBlur, value }) => (
                <DatePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  showTimeSelect
                  dateFormat="dd MMMM yyyy HH:mm"
                  placeholderText="Select sale's end date"
                />
              )}
            />
          </div>
        </div>
        <label className="text-white">Price</label>
        <input
          min="0"
          type="number"
          name="price"
          ref={register}
          className="mb-2"
        ></input>
        <label className="text-white">Stock</label>
        <input
          min="0"
          type="number"
          name="stock"
          ref={register}
          className="mb-2"
        ></input>
        <label className="text-white">Artist Name</label>
        <input name="artistName" ref={register} className="mb-2"></input>
        <label className="text-white">Image URL</label>
        <input name="imageUrl" ref={register} className="mb-2"></input>
        <div>
          <input type="submit" value="Add Concert"></input>
        </div>
      </div>
    </form>
  );
};

export default CreateConcert;
