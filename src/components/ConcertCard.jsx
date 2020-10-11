import React from "react";

const ConcertCard = (props) => {
  console.log("hehe", props.name);
  return (
    <div className="w-1/3">
      <img src={props.imageUrl} />
      <div className="bg-white flex flex-row justify-between p-4">
        <h1 className="text-xl text-black">{props.name}</h1>
        <button>See Details</button>
      </div>
    </div>
  );
};

export default ConcertCard;
