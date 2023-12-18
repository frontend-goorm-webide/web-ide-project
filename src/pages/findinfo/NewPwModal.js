import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { PiUserCircle } from 'react-icons/pi';

// 모달의 헤더, 본문, 푸터를 가운데 정렬하는 스타일
const CenteredModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const CenteredModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CenteredModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: center;
  padding: 0.3rem 1rem;
`;

const NewPwModal = ({ title, contents, btnName, closePwModal, redirectTo }) => {
  // 훅
  const navigate = useNavigate();

  // 버튼 클릭 시, 페이지 이동 및 모달 닫기
  const handleButtonClick = () => {
    if (redirectTo) {
      navigate(redirectTo); // 버튼 클릭 시 전달받은 페이지 이동
    }
    closePwModal(); // 모달 닫기
  };

  // 모달 밖 화면 클릭해도 모달 창 닫히지 않도록 설정
  // 모달 닫을 때는 닫기 버튼으로만 닫히도록 설정
  const backdrop = false;

  // 비밀번호 재설정
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');

  return (
    <div>
      <Modal isOpen={true} toggle={closePwModal} backdrop={backdrop}>
        <CenteredModalHeader toggle={closePwModal}>{title}</CenteredModalHeader>
        <CenteredModalBody>
          <Input
            label={
              <>
                <p>
                  <PiUserCircle />
                  비밀번호 재설정
                </p>
              </>
            }
            placeholder='영문, 숫자 포함 최소 8자리'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            label={
              <>
                <p>
                  <PiUserCircle />
                  비밀번호 확인
                </p>
              </>
            }
            placeholder='위에서 설정한 비밀번호 재입력'
            value={checkNewPassword}
            onChange={(e) => setCheckNewPassword(e.target.value)}
          />
          {contents}
        </CenteredModalBody>
        <CenteredModalFooter>
          <Button onClick={handleButtonClick}>{btnName}</Button>
        </CenteredModalFooter>
      </Modal>
    </div>
  );
};

export default NewPwModal;
