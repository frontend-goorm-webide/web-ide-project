import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { PiUserCircle } from 'react-icons/pi';
import { CenteredModalHeader, CenteredModalBody, CenteredModalFooter } from './StylePwModal';
// import axios from 'axios';

const NewPwModal = ({ isPwOpen, title, contents, btnName, closePwModal, redirectTo }) => {
  // 훅
  const navigate = useNavigate();
  // 비밀번호 재설정
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  // 경고 메시지 상태
  const [passwordError, setPasswordError] = useState('');

  // API서버에서 가져온 사용자 데이터를 저장하기 위한 state
  // const [fetchedUser, setFetchedUser] = useState(null);

  //비밀번호 유효성 검사 함수
  const validatePassword = () => {
    const regex = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
    return regex.test(newPassword);
  };

  // 버튼 클릭 시, 페이지 이동 및 모달 닫기
  const handleButtonClick = (event) => {
    event.preventDefault();

    if (!validatePassword()) {
      setPasswordError('비밀번호는 최소 8자 이상이며, 문자와 숫자를 모두 포함해야 합니다.');
      return;
    }

    if (newPassword !== checkNewPassword) {
      // 비밀번호가 일치하지 않을경우
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 비밀번호가 일치할 경우
    setPasswordError('비밀번호가 변경되었습니다.');

    // 폼 제출 로직   임시 값 확인
    console.log('비밀번호 재설정 완료) 새로운 비밀번호: ', newPassword);

    // 몇 초 후에 페이지 이동
    setTimeout(() => {
      closePwModal();
      if (redirectTo) {
        navigate(redirectTo);
      }
    }, 2000); // 2초 후에 페이지 이동
  };

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
    <div>
      <Modal isOpen={isPwOpen} toggle={closePwModal} backdrop={false}>
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
                <p style={{ paddingTop: '10px' }}>
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
              style={{
                marginTop: '5px',
                color: passwordError === '비밀번호가 변경되었습니다.' ? 'green' : 'red',
              }}
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
  );
};

export default NewPwModal;
