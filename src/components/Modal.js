import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router에서 useNavigate 가져오기
import Button from './Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const CommonModal = ({ title, contents, btnName, closeModal, redirectTo }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (redirectTo) {
      navigate(redirectTo); // 버튼 클릭 시 페이지 이동
    }
    closeModal(); // 모달 닫기
  };

  return (
    <div>
      {/* isOpen은 항상 true : 모달이 항상 열려있음
      toggle : 모달 열고 닫는 것을 수행하는 함수
      toggle={closeModal} : toggle 속성을 closeModal 함수로 설정 */}
      <Modal isOpen={true} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>{title}</ModalHeader>
        <ModalBody>{contents}</ModalBody>
        <ModalFooter>
          <Button onClick={handleButtonClick}>{btnName}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CommonModal;
