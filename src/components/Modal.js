import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const CommonModal = ({ title, contents, btnName, closeModal, redirectTo }) => {
  // 훅
  const navigate = useNavigate();

  // 버튼 클릭 시, 페이지 이동 및 모달 닫기
  const handleButtonClick = () => {
    if (redirectTo) {
      navigate(redirectTo); // 버튼 클릭 시 전달받은 페이지 이동
    }
    closeModal(); // 모달 닫기
  };

  return (
    <div>
      {/* isOpen은 항상 true : 모달이 항상 열려있음
      toggle : 모달 열고 닫는 것을 수행하는 함수 (reractstrap 정의)
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
