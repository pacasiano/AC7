import React from "react";

const Modal = ({ isOpen, children }) => {
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
  
  function Success({isModalOpen}) {
  
    return (
      <div className="transition-all ease-in fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border">
                <div className="text-green-500 text-md font-semibold text-center">Successfully edited account Information!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

  function Error({isModalOpen}) {
  
    return (
      <div className="transition-all ease-in fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border">
                <div className="text-red-500 text-md font-semibold text-center">Error, invalid input!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

  function SuccessAddressEdit({isModalOpen}) {
  
    return (
      <div className="fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border">
                <div className="text-green-500 text-md font-semibold text-center">Successfully edited Address Information!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

  function SuccessAddressAdd({isModalOpen}) {
  
    return (
      <div className="fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border">
                <div className="text-green-500 text-md font-semibold text-center">Successfully Added Address!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

  function FailAddressAdd({isModalOpen}) {
  
    return (
      <div className="fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border animate-bounce2">
                <div className="text-red-500 text-md font-semibold text-center">Error, please fill in all details!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

  function AddressDeleted({isModalOpen}) {
  
    return (
      <div className="fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border">
                <div className="text-green-500 text-md font-semibold text-center">Address has been successfully deleted!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

  function ErrorTaken({isModalOpen}) {
  
    return (
      <div className="fixed pt-16">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center ">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border animate-bounce2">
                <div className="text-red-500 text-md font-semibold text-center">Error, Username is alredy taken!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };

export {Success, Error, SuccessAddressEdit, SuccessAddressAdd, FailAddressAdd, AddressDeleted, ErrorTaken};