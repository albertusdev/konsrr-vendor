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
    <h1>My Merchandise</h1>
    <button onClick={openModal}>Add Merchandise</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Merchandise"
        > 
          <button onClick={closeModal}>Close</button>
          <MerchandiseForm></MerchandiseForm>
        </Modal>

    {merchandises.map(merchandise => <MerchandiseItem merchandise={merchandise}/>)}
    </div>
}