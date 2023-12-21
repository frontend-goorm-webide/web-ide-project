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

// isMyInfoOpen : 내정보 모달 열기/닫기
// closeMyInfo : ide.js 에서 closeMyInfoModal() 함수
// open : ide.js 에서 openModal() 함수 -> 회원탈퇴(공통 모달)
const MyInfoModal = ({ isMyInfoOpen, closeMyInfo, open }) => {
  // 상태 추가
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
  // ===========================프로필 사진 변경===========================
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const apiUrl = 'YOUR_API_ENDPOINT_URL';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  // ===========================api===========================

  // 내정보 api 요청
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/my-info', {
        headers: {
          Token: 'token-value',
        },
      })
      .then((response) => {
        // 성공적으로 응답을 받았을 때의 처리
        console.log('서버 응답:', response.data);

        const userData = response.data[0];
        setProfilePicture(userData.storedFileName);
        setName(userData.name);
        setUserId(userData.userId);
        setEmail(userData.email);
        setPhone(userData.phone);
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error('에러 발생:', error);
      });
  }, []);

  // 회원탈퇴 api 요청
  useEffect(() => {
    axios
      .put('http://localhost:8080/api/users/delete', {
        headers: {
          Token: 'token-value',
        },
      })
      .then((response) => {
        // 성공적으로 응답을 받았을 때의 처리
        console.log('서버 응답:', response.data);

        clickRemoveButton();
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error('에러 발생:', error);
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
              <ProfileImage src={previewImage || '/img/kakaoLogin.png'} alt='기본 프로필 사진' />
              <p>프로필 사진</p>
              {/* 프로필 사진 변경 기능 */}
              <input type='file' accept='image/*' onChange={handleImageChange} />
            </SectionContainer>
            {/* 프로필 변경 버튼 */}
            <ButtonContainer>
              <Button onClick={handleImageUpload}>프로필 변경</Button>
            </ButtonContainer>
          </Section>
          {/* 가입 정보 섹션 */}
          <Section>
            <p>이름: {name}</p>
            <p>아이디: {userId}</p>
            <p>이메일: {email}</p>
            <p>휴대폰 번호: {phone}</p>
          </Section>
        </CenteredModalBody>

        <CenteredModalFooter>
          {/* 회원 탈퇴 버튼 ==> 이벤트 삭제 */}
          <Button onClick={clickRemoveButton}>회원탈퇴</Button>
        </CenteredModalFooter>
      </Modal>
    </div>
  );
};

export default MyInfoModal;
