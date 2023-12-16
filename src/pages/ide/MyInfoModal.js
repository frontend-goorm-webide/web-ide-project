import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

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

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-items: center;
`;

const Button = styled.button`
  width: 110px;
  height: 40px;
  background-color: #36599d;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  }
  margin-top: 10px;
`;

const SERVER_URL = 'https://jsonplaceholder.typicode.com/users';
const MyInfoModal = ({ onRequestClose }) => {
  // 상태 추가
  const [profilePicture, setProfilePicture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기
  const navigate = useNavigate();
  // 삭제 모달 상태
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  // 프로필 정보 변경 함수
  const handleProfileChange = () => {
    // 변경된 정보를 콘솔에 출력
    console.log('Profile information changed:', {
      profilePicture,
    });
  };

  const handleConfirmdrawal = () => {
    // 회원 탈퇴 요청을 콘솔에 출력
    console.log('Withdrawal requested');
    // 회원 탈퇴 완료 시 알림창 표시
    alert('회원 탈퇴가 완료되었습니다.');
    // 모달 닫기
    onRequestClose();
    //메인 페이지로 이동
    navigate('/');
  };

  const handleCanceldrawal = () => {
    // 모달 닫기
    setDeleteModalIsOpen(false);
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

  const backdrop = false;

  return (
    <Modal isOpen={true} toggle={onRequestClose} backdrop={backdrop}>
      <ModalHeader toggle={onRequestClose}>내 정보</ModalHeader>

      <CenteredModalBody>
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

          {/* 가입 정보 섹션 */}
          <Section>
            <p>이름: {name}</p>
            <p>아이디: {email}</p>
            <p>이메일: {phone}</p>
          </Section>
        </Section>
      </CenteredModalBody>

      <CenteredModalFooter>
        <Button onClick={() => setDeleteModalIsOpen(true)}>회원 탈퇴</Button>
      </CenteredModalFooter>

      {/* 회원탈퇴 안내 모달 */}
      <Modal isOpen={deleteModalIsOpen} toggle={handleCanceldrawal} contentLabel='Delete Modal'>
        <ModalHeader toggle={handleCanceldrawal}>회원 탈퇴</ModalHeader>

        <CenteredModalBody>정말 탈퇴 하시겠습니까?</CenteredModalBody>

        <CenteredModalFooter>
          <Button onClick={handleConfirmdrawal}>탈퇴</Button>
        </CenteredModalFooter>
      </Modal>
    </Modal>
  );
};

export default MyInfoModal;
