import React from "react";
import { Link } from "react-router-dom";

const ConcertCard = (props) => {
  return (
    <div className="w-1/3">
      <img alt="" src={props.imageUrl} />
      <div className="bg-white flex flex-row justify-between p-4">
        <h1 className="text-xl text-black">{props.name}</h1>
        <Link to={`/concert/${props.id}`}>
          <button>See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ConcertCard;
