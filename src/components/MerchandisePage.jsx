import React from "react";
import {useSelector, useDispatch} from "react-redux";
import * as firebase from 'firebase';
import MerchandiseItem from "./MerchandiseItem";
import {setMerchandises} from "../reducers/merchandiseReducer";
import Modal from "react-modal";
import MerchandiseForm from "./MerchandiseForm";

Modal.setAppElement('#root')

export default function MerchandisePage() {
  const auth = useSelector(state => state.auth)
  const merchandises = useSelector(state => state.merchandise.merchandises)
  const store = firebase.firestore()
  const dispatch = useDispatch()
  const [modalIsOpen,setIsOpen] = React.useState(false);

  React.useEffect(() => {
    store.collection("merchandises")
      .where("vendor", "==", store.collection('vendors').doc(auth.user.uid))
      .get()
      .then(function(querySnapshot) {
        dispatch(setMerchandises(querySnapshot.docs.map(doc => {
          const {vendor, ...rest} = doc.data()
          return {...rest, id: doc.id};
        })));
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }, [auth.user.uid, dispatch, store])

  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }

  return <div>
    <h1 className="text-xl mb-4">My Merchandise</h1>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Merchandise"
        > 
          <button onClick={closeModal}>Close</button>
          <MerchandiseForm></MerchandiseForm>
        </Modal>
    <div className="flex">
      <button onClick={openModal} className="flex items-center justify-center flex-col bg-white mr-2 w-1/5 mb-4 p-3 border-gray-500 border-solid border-2">
        <div className="text-3xl">+</div>
        <div>Add Merchandise</div>
      </button>
      {merchandises.map(merchandise => <MerchandiseItem merchandise={merchandise}/>)}
    </div>
    </div>
}