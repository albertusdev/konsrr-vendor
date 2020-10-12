import React from "react";
import * as firebase from "firebase";
import { useParams } from "react-router-dom";

export default function ConcertDetail() {
  const [data, setData] = React.useState(null);
  const params = useParams();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("concerts")
      .doc(params.id)
      .onSnapshot(function (doc) {
        setData(doc.data());
      });
  }, [params.id]);

  console.log("GEGE", data);

  return (
    <div className="flex flex-row">
      <img className="flex flex-1" src={data?.imageUrl} />
      <div className="flex flex-1 flex-col ml-4">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
        {data && (
          <p className="text-xl">
            {new Date(data.start.seconds * 1000).toDateString()} -{" "}
            {new Date(data.start.seconds * 1000).toLocaleTimeString()}
          </p>
        )}
        {data && (
          <p className="text-xl">
            {new Date(data.end.seconds * 1000).toDateString()} -{" "}
            {new Date(data.end.seconds * 1000).toLocaleTimeString()}
          </p>
        )}
        <p className="text-xl">{data?.description}</p>
        <p className="text-xl">
          <b>Stock</b>: {data?.stock}
        </p>
        <p className="text-xl">
          <b>Price</b>: {data?.price}
        </p>
      </div>
    </div>
  );
}
