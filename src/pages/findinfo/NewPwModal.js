import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { PiUserCircle } from 'react-icons/pi';
import axios from 'axios';

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
  // 비밀번호 재설정
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  // 경고 메시지 상태
  const [passwordError, setPasswordError] = useState('');

  // API서버에서 가져온 사용자 데이터를 저장하기 위한 state
  const [fetchedUser, setFetchedUser] = useState(null);

  //비밀번호 유효성 검사 함수
  const validatePassword = () => {
    const regex = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
    return regex.test(newPassword);
  };

  // 버튼 클릭 시, 페이지 이동 및 모달 닫기
  const handleButtonClick = (event) => {
    event.preventDefault();

    if (!validatePassword()) {
      setPasswordError('비밀번호는 최소 8자 이상이며, 문자와 숫자를 모두 포함해야 합니다');
      return;
    }

    if (newPassword !== checkNewPassword) {
      // 비밀번호가 일치하지 않을경우
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 비밀번호가 일치할 경우
    setPasswordError('비밀번호가 변경되었습니다.');

    // 폼 제출 로직
    console.log('Form submitted with password:', newPassword);

    // 몇 초 후에 페이지 이동
    setTimeout(() => {
      closePwModal();
      if (redirectTo) {
        navigate(redirectTo);
      }
    }, 2000); // 2초 후에 페이지 이동
  };
  // 모달 밖 화면 클릭해도 모달 창 닫히지 않도록 설정
  // 모달 닫을 때는 닫기 버튼으로만 닫히도록 설정
  const backdrop = false;

  // //API
  // useEffect(() => {
  //   const payload = {};

  //   axios
  //     .post('https://jsonplaceholder.typicode.com/users', payload)
  //     .then((response) => {
  //       const userData = response.data[0];
  //       const fetchedData = {
  //         userId: userData.userId,
  //         name: userData.name,
  //         email: userData.email,
  //       };
  //       setFetchedUser(fetchedData);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
  // }, []);

  return (
    <form onSubmit={handleButtonClick}>
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
            {passwordError && (
              <p
                style={{ color: passwordError === '비밀번호가 변경되었습니다.' ? 'green' : 'red' }}
              >
                {passwordError}
              </p>
            )}
            {/* 경고 메시지 표시 */}
            {contents}
          </CenteredModalBody>
          <CenteredModalFooter>
            <Button onClick={handleButtonClick}>{btnName}</Button>
          </CenteredModalFooter>
        </Modal>
      </div>
    </form>
  );
};

export default NewPwModal;
