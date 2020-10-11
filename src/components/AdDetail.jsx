import React from "react";
import * as firebase from "firebase";
import {useParams} from "react-router-dom";

export default function AdDetail() {
  const [data, setData] = React.useState(null)
  const params = useParams()

  React.useEffect(() => {
    firebase.firestore().collection("ads").doc(params.id)
    .onSnapshot(function(doc) {
      setData(doc.data())
    });
  }, [params.id])  
  const metricStyle = "w-40 mr-2 p-4 rounded bg-gray-200 flex flex-col items-center justify-center"
return data ? <div>
  <h1 className="text-2xl mb-2">Ad for {data.concertName} on {data.date}</h1>
  <img alt="" src={data.imageURL}></img>
  <div className="mb-6">
  <h2 className="text-xl mt-4 mb-2">Metrics</h2>
  <div className="flex">
    <div className={metricStyle}>
      <div className="text-xl">{data.views}</div>
      <div>views</div>
    </div>
    <div className={metricStyle}>
      <div className="text-xl">{data.clicks}</div>
      <div>clicks</div>
    </div>
    <div className={metricStyle}>
      <div className="text-xl">{(data.views && data.clicks/data.views*100).toFixed(1)}%</div>
      <div>CTR</div>
    </div>
    <div className={metricStyle}>
      <div className="text-xl">{data.numAddToWishlist}</div>
      <div>add to wishlist</div>
    </div>
    <div className={metricStyle}>
      <div className="text-xl">{data.numConverted}</div>
      <div>purchases</div>
    </div>
  </div>
  </div>

  <button className="p-2 rounded bg-gray-200">New Promotion</button>
</div> : null
}