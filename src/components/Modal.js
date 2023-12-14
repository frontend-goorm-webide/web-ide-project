import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

// 모달의 헤더, 본문, 푸터를 가운데 정렬하는 스타일
const CenteredModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
`;

const CenteredModalBody = styled(ModalBody)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: center;
`;

const CommonModal = ({ title, contents, btnName, closeModal, redirectTo }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
    closeModal();
  };

  const backdrop = false;

  return (
    <div>
      <Modal isOpen={true} toggle={closeModal} backdrop={backdrop}>
        <CenteredModalHeader toggle={closeModal}>{title}</CenteredModalHeader>
        <CenteredModalBody>{contents}</CenteredModalBody>
        <CenteredModalFooter>
          <Button onClick={handleButtonClick}>{btnName}</Button>
        </CenteredModalFooter>
      </Modal>
    </div>
  );
};

export default CommonModal;
