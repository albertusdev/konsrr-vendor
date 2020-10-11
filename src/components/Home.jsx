import React from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
import Modal from "react-modal";
import MerchandiseForm from "./MerchandiseForm";
import FirebaseStorageImg from "./FirebaseStorageImg";

Modal.setAppElement('#root')

export default function Home() {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }
  return <div>
    <button onClick={() => firebase.auth().signOut()}>logout</button>
    <button onClick={openModal}>Add Merchandise</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Merchandise"
        > 
          <button onClick={closeModal}>Close</button>
          <MerchandiseForm></MerchandiseForm>
        </Modal>
    <FirebaseStorageImg src={firebase.storage().ref().child("/merchandise/6BNZcZY76Lq0JrCLEbsx")}></FirebaseStorageImg>
    Home
    
  </div>
}