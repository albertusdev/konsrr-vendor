import React from "react";
import {useSelector, useDispatch} from "react-redux";
import * as firebase from 'firebase';
import {setMerchandises} from "../reducers/merchandiseReducer";
import Modal from "react-modal";
import CreateAdsForm from "./CreateAdsForm";

Modal.setAppElement('#root')

function getDate() {
  const date = new Date();
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - (offset*60*1000)).toISOString().split('T')[0]
}

function AdsItem({ad}) {
  return <div className="bg-white mr-2 w-1/5 mb-4 rounded">
    <img height="200" alt="" src={ad.imageURL}/>
    <div className="p-3 border-gray-500 border-solid border-2 border-t-0">
    <h3 className="font-bold text-black">{ad.concertName}</h3>
    <div className="text-black">{ad.date}</div>
    </div>
  </div>
}

export default function MerchandisePage() {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const auth = useSelector(state => state.auth)
  const [ads, setAds] = React.useState([]);
  const store = firebase.firestore()

  function fetchAds() {
    store.collection("ads")
    .where("vendor", "==", store.collection('vendors').doc(auth.user.uid))  
    .get()
    .then(function(querySnapshot) {
      setAds(querySnapshot.docs.map(doc => {
        const {vendor, ...rest} = doc.data()
        return {...rest, id: doc.id};
      }));
    })
  }

  React.useEffect(() => fetchAds(), /* eslint-disable */ [])

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal(){
    setIsOpen(false);
  }

  return <div>
    <h1 className="text-xl mb-4">My Ads</h1>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Merchandise"
        > 
          <button onClick={closeModal}>Close</button>
          <CreateAdsForm onSuccess={() => { fetchAds(); closeModal()}}></CreateAdsForm>
        </Modal>
      <h2 className="text-lg mb-4">Scheduled Ads</h2>
        <div className="flex">
          <button onClick={openModal} className="flex items-center justify-center flex-col  bg-white mr-2 w-1/5 mb-4 p-3 border-gray-500 border-solid border-2">
            <div className="text-3xl">+</div>
            <div>Create New Ad</div>
          </button>
          {ads.filter(ad => ad.date > getDate()).map(ad => <AdsItem ad={ad}/>)}
        </div>  
      <h2 className="text-lg mb-4">Running Ads</h2>
      <div className="flex">
          {ads.filter(ad => ad.date == getDate()).map(ad => <AdsItem ad={ad}/>)}
        </div>  
      <h2 className="text-lg mb-4">Past Ads</h2>
      <div className="flex">
          {ads.filter(ad => ad.date < getDate()).map(ad => <AdsItem ad={ad}/>)}
      </div>  
    </div>
} 