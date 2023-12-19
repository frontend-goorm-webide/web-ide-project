import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
  CenteredModalHeader,
  CenteredModalBody,
  CenteredModalFooter,
  SectionContainer,
  ProfileImage,
  Section,
  ButtonContainer,
  Button,
} from './StyleMyInfoModal';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/users';

// isMyInfoOpen : 내정보 모달 열기/닫기
// closeMyInfo : ide.js 에서 closeMyInfoModal() 함수
// open : ide.js 에서 openModal() 함수 -> 회원탈퇴(공통 모달)
const MyInfoModal = ({ isMyInfoOpen, closeMyInfo, open }) => {
  // 상태 추가
  const [profilePicture, setProfilePicture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 프로필 정보 변경 함수
  const handleProfileChange = () => {
    // 변경된 정보를 콘솔에 출력
    console.log('Profile information changed:', {
      profilePicture,
      name,
      email,
      phone,
    });
  };

  // 회원 탈퇴 버튼 클릭 시 처리
  const clickRemoveButton = () => {
    // ide.js 에서 openModal() 실행 -> 공통 Modal
    open({
      title: '회원탈퇴',
      contents: '회원 탈퇴가 완료되었습니다.',
      btnName: '확인',
      redirectTo: '/',
    });
  };

  useEffect(() => {
    axios
      .get(SERVER_URL)
      .then((response) => {
        const userData = response.data[0];
        setProfilePicture(userData.profilePicture);
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <Modal isOpen={isMyInfoOpen} toggle={closeMyInfo} backdrop={false}>
        <CenteredModalHeader toggle={closeMyInfo}>내 정보</CenteredModalHeader>

        <CenteredModalBody>
          {/* 프로필 섹션 */}
          <Section>
            <SectionContainer>
              <ProfileImage src='' alt='기본 프로필 사진' />
              <p>프로필 사진: {profilePicture}</p>
              {/* 프로필 사진 변경 기능 */}
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setProfilePicture(e.target.value)}
              />
            </SectionContainer>
            {/* 프로필 변경 버튼 */}
            <ButtonContainer>
              <Button onClick={handleProfileChange}>프로필 변경</Button>
            </ButtonContainer>
          </Section>
          {/* 가입 정보 섹션 */}
          <Section>
            <p>이름: {name}</p>
            <p>아이디: {email}</p>
            <p>이메일: {phone}</p>
          </Section>
        </CenteredModalBody>

        <CenteredModalFooter>
          {/* 회원 탈퇴 버튼 */}
          <Button onClick={clickRemoveButton}>회원탈퇴</Button>
        </CenteredModalFooter>
      </Modal>
    </div>
  );
};

export default MyInfoModal;
