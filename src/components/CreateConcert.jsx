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
              name="datetime_start"
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
              name="datetime_end"
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
              name="sale_start"
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
              name="sale_end"
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
      </div>
      <div>
        <input type="submit" value="Add Concert"></input>
      </div>
    </form>
  );
};

export default CreateConcert;
