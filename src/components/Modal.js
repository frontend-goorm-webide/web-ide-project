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
  padding: 0.5rem 1rem;
`;

const CenteredModalBody = styled(ModalBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`;

const CenteredModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: center;
  padding: 0.3rem 1rem;
`;

const CommonModal = ({ title, contents, btnName, closeModal, redirectTo }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // if (redirectTo) {
    //   navigate(redirectTo);
    // }
    navigate(redirectTo);
    closeModal();
  };

  const backdrop = false;

  return (
    <div>
      <Modal isOpen={true} toggle={closeModal} backdrop={backdrop}>
        {/* 회원 탈퇴인 경우 : toggle 제거 (닫기표시 제거) */}
        {title === '회원탈퇴' && <CenteredModalHeader>{title}</CenteredModalHeader>}
        {title !== '회원탈퇴' && (
          <CenteredModalHeader toggle={closeModal}>{title}</CenteredModalHeader>
        )}
        <CenteredModalBody>{contents}</CenteredModalBody>
        <CenteredModalFooter>
          <Button onClick={handleButtonClick}>{btnName}</Button>
        </CenteredModalFooter>
      </Modal>
    </div>
  );
};

export default CommonModal;
