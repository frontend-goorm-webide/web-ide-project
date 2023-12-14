import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalWrapper = styled.div`
  width: 500px;
  height: 300px;
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

  // 회원 탈퇴 함수
  const handleWithdrawal = () => {
    // 회원 탈퇴 요청을 콘솔에 출력
    console.log('Withdrawal requested');
    // 회원 탈퇴 완료 시 알림창 표시
    alert('회원 탈퇴가 완료되었습니다.');
    // 모달 닫기
    onRequestClose();
    //메인 페이지로 이동
    navigate('/');
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
    <ModalWrapper>
      {/* 프로필 섹션 */}
      <Section>
        <SectionContainer>
          <ProfileImage src='' alt='기본 프로필 사진' />
          <p>프로필 사진: {profilePicture}</p>
          {/* 프로필 사진 변경 기능 */}
          <input type='file' accept='image/*' onChange={(e) => setProfilePicture(e.target.value)} />
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

      {/* 닫기 버튼 */}
      <Button onClick={onRequestClose}>닫기</Button>

      {/* 회원 탈퇴 버튼 */}
      <Button onClick={handleWithdrawal}>회원 탈퇴</Button>
    </ModalWrapper>
  );
};

export default MyInfoModal;
