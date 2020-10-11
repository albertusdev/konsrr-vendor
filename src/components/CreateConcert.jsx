import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";

const CreateConcert = () => {
  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
      console.log("ehehe", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h1>Create Concert</h1>
        <label>Name</label>
        <input name="name" ref={register} />
        <label>Description</label>
        <input name="description" ref={register} />
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col">
            <label>Concert Start</label>
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
            <label>Concert End</label>
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
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col">
            <label>Sale Start</label>
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
            <label>Sale End</label>
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
        <label>Price</label>
        <input min="0" type="number" name="price" ref={register}></input>
        <label>Stock</label>
        <input min="0" type="number" name="stock" ref={register}></input>
        <label>Artist Name</label>
        <input name="artistName" ref={register}></input>
      </div>
      <div>
        <input type="submit" value="Add Concert"></input>
      </div>
    </form>
  );
};

export default CreateConcert;
