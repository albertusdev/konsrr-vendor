import React from "react";
import {useSelector, useDispatch} from "react-redux";
import * as firebase from 'firebase';
import {setMerchandises} from "../reducers/merchandiseReducer";
import Modal from "react-modal";
import CreateAdsForm from "./CreateAdsForm";

Modal.setAppElement('#root')

export default function MerchandisePage() {
  const [modalIsOpen,setIsOpen] = React.useState(false);

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
          <CreateAdsForm onSuccess={() => {}}></CreateAdsForm>
        </Modal>
      <h2 className="text-lg mb-4">Scheduled Ads</h2>
        <div className="flex">
          <button onClick={openModal} className="flex items-center justify-center flex-col  bg-white mr-2 w-1/5 mb-4 p-3 border-gray-500 border-solid border-2">
            <div className="text-3xl">+</div>
            <div>Create New Ad</div>
          </button>
        </div>  
      <h2 className="text-lg mb-4">Running Ads</h2>

      <h2 className="text-lg mb-4">Past Ads</h2>

    </div>
} 