import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonModal from '../../components/Modal';
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

//기존
// const ModalWrapper = styled.div`
//   width: 500px;
//   height: 300px;
// `;

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
const MyInfoModal = ({ closeMyInfoModal }) => {
  // 상태 추가
  const [profilePicture, setProfilePicture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기
  // const navigate = useNavigate();

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

  const backdrop = false;
  // 회원 탈퇴 모달 열고 닫기 -> false 초기화
  const [isModalOpen, setModalOpen] = useState(false);
  // 회원 탈퇴 모달 내용 -> 빈내용 초기화
  const [modalContent, setModalContent] = useState({});

  // 회원 탈퇴 모달 열기 함수
  const openModal = (content) => {
    setModalOpen(true); // isModalOpen = true
    setModalContent(content); // 모달 내용 전달
  };
  // 회원 탈퇴 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false); // isModalOpen = false
    setModalContent({}); // 모달 내용 공백 전달
    console.log('Withdrawal requested');
  };
  // 회원 탈퇴 버튼 클릭 시 처리
  const clickRemoveButton = () => {
    // 회원 탈퇴 모달 열기
    openModal({
      title: '회원탈퇴',
      contents: '회원 탈퇴가 완료되었습니다.',
      btnName: '확인',
      redirectTo: '/', // main 페이지 이동
    });

    // 현재 모달 닫기
    // closeMyInfoModal();
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
      <Modal isOpen={true} toggle={closeMyInfoModal} backdrop={backdrop}>
        <CenteredModalHeader toggle={closeMyInfoModal}>내 정보</CenteredModalHeader>
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
          {isModalOpen && <CommonModal {...modalContent} closeModal={closeModal} />}
        </CenteredModalFooter>
      </Modal>
    </div>
  );
};

export default MyInfoModal;
