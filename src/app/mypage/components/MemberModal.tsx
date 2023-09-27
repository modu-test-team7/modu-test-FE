/* eslint-disable */

import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface MemberModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleUserDelete: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ isModalOpen, closeModal, handleUserDelete }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="회원 탈퇴 확인"
    >
      <style jsx>{`
        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: -15px;
        }
        .modal-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 20px;
        }
        .modal-button {
          padding: 10px;
          border: none;
          background-color: #11b767;
          color: #ffffff;
          cursor: pointer;
          border-radius: 10px;
          transition: background-color 0.3s;
        }
        .modal-button:hover {
          background-color: #11b767;
        }
      `}</style>
      <div className="modal-content">
        <h2>정말 탈퇴 하실 건가요? 🤧</h2>
        <div className="modal-buttons">
          <button className="modal-button" onClick={handleUserDelete}>
            네💔
          </button>
          <button className="modal-button" onClick={closeModal}>
            취소💚
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberModal;
