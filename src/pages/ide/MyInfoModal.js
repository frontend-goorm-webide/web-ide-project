import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
width: 500px; 
height: 300px; 
`;

const Section = styled.div`
margin - bottom: 20px;
`;

const Button = styled.button`
color: #000000;
padding: 8px 16px;
border: 1px solid #546e7a;
margin - left: 8px;
cursor: pointer;

  &:hover {
  background - color: #78909c;
}
`;

const MyInfoModal = ({ onRequestClose }) => {
  // 상태 추가
  const [profilePicture, setProfilePicture] = useState(''); // 프로필 사진
  const [name, setName] = useState(''); // 이름
  const [email, setEmail] = useState(''); // 이메일
  const [phone, setPhone] = useState(''); // 휴대전화번호

  // 프로필 정보 변경 함수
  const handleProfileChange = () => {
    // 실제로 서버에 변경된 정보를 전송하는 로직을 추가해야 합니다.
    console.log('Profile information changed:', {
      profilePicture,
      name,
      email,
      phone,
    });
  };

  // 회원 탈퇴 함수
  const handleWithdrawal = () => {
    // 실제로 서버에 회원 탈퇴 요청을 보내는 로직을 추가해야 합니다.
    console.log('Withdrawal requested');
  };

  return (
    <ModalWrapper>
      {/* 프로필 섹션 */}
      <Section>
        <img src='/Users/jiyeong/Documents/web-ide-frontend-main/src/pages/ide/user_picture.jpg' alt="기본 프로필 사진"></img>
        <p>프로필 사진: {profilePicture}</p>
        {/* 프로필 사진 변경 기능 */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        {/* 프로필 변경 버튼 */}
        <Button onClick={handleProfileChange}>프로필 변경</Button>
      </Section>

      {/* 가입 정보 섹션 */}
      <Section>
        <p>이름: {name}</p>
        {/* 이름 변경 기능 */}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>아이디: {email}</p>
        {/* 아이디 변경 기능 */}
        <input
          type="text"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>이메일: {phone}</p>
        {/* 이메일 변경 기능 */}
        <input
          type="text"
          placeholder="이메일"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Section>

      {/* 닫기 버튼 */}
      <Button onClick={onRequestClose}>닫기</Button>

      {/* 회원 탈퇴 버튼 */}
      <Button onClick={handleWithdrawal}>회원 탈퇴</Button>
    </ModalWrapper>
  );
};

export default MyInfoModal;