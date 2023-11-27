import React, { useState } from 'react';
import Check from "../imgs/check.png";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -translate-x-56 z-50">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                <div className="p-5 flex flex-col justify-center items-center gap-2">
                    <img src={Check} alt="check" className="w-32 h-32"/>
                    <span className="text-xl font-bold">Inventory-in successful!</span>
                    <button onClick={closeModal} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;