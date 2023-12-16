import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import { PiUserCircle } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import {
  GlobalStyle,
  ErrorText,
  FindInfoLogo,
  FindIdContainer,
  FindPasswordContainer,
} from './FindInfoStyle';
import CommonModal from '../../components/Modal';
import NewPwModal from './NewPwModal';

// FindInfo 컴포넌트
const FindInfo = () => {
  const [nameForId, setNameForId] = useState('');
  const [emailForId, setEmailForId] = useState('');

  const [nameForPassword, setNameForPassword] = useState('');
  const [emailForPassword, setEmailForPassword] = useState('');
  const [idForPassword, setIdForPassword] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 제출 로직
    console.log(nameForId, emailForId, nameForPassword, emailForPassword, idForPassword);

    // console.log대신 API호출
    // 예: await axios.post('/api/userinfo', { username, email });

    // 입력 필드 초기화
    setNameForId('');
    setEmailForId('');
    setNameForPassword('');
    setEmailForPassword('');
    setIdForPassword('');
  };

  // 모달 열고 닫기 -> false 초기화
  const [isModalOpen, setModalOpen] = useState(false);
  // 비밀번호재설정 모달 열고 닫기 -> false 초기화
  const [isPwModalOpen, setPwModalOpen] = useState(false);
  // 모달 내용 -> 빈내용 초기화
  const [modalContent, setModalContent] = useState({});
  // 비밀번호재설정모달 내용 -> 빈내용 초기화
  const [pwModalContent, setPwModalContent] = useState({});

  // 모달 열기 함수
  const openModal = (content) => {
    setModalOpen(true); // isModalOpen = true
    setModalContent(content); // 모달 내용 전달
  };
  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false); // isModalOpen = false
    setModalContent({}); // 모달 내용 공백 전달
  };
  // 모달 열기 함수 (비밀번호재설정 모달)
  const openPwModal = (content) => {
    setPwModalOpen(true); // isModalOpen = true
    setPwModalContent(content); // 모달 내용 전달
  };
  // 모달 닫기 함수 (비밀번호재설정 모달)
  const closePwModal = () => {
    setPwModalOpen(false); // isModalOpen = false
    setPwModalContent({}); // 모달 내용 공백 전달
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFindIdButtonClick = () => {
    if (!nameForId || !emailForId) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>모든 필드를 입력해주세요</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
    } else if (!validateEmail(emailForId)) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>올바른 이메일 형식을 입력해주세요</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
    } else {
      openModal({
        title: '아이디 찾기',
        contents: '해당 아이디로 다시 로그인 해주세요:)',
        btnName: '로그인하기',
        redirectTo: '/', // main 페이지 이동
      });
    }
  };

  const handleFindPwButtonClick = () => {
    if (!nameForPassword || !emailForPassword || !idForPassword) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>모든 필드를 입력해주세요</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
    } else if (!validateEmail(emailForPassword)) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>올바른 이메일 형식을 입력해주세요</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
    } else {
      openPwModal({
        title: '아이디 찾기',
        contents: '해당 아이디로 다시 로그인 해주세요:)',
        btnName: '로그인하기',
        redirectTo: '/', // main 페이지 이동
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <FindInfoLogo>
        <Logo />
      </FindInfoLogo>

      <form onSubmit={handleSubmit}>
        <FindIdContainer>
          <div>
            <span>아이디 찾기</span>
            <div className='input-find-id'>
              <Input
                label={
                  <>
                    <p>
                      <PiUserCircle />
                      성명
                    </p>
                  </>
                }
                placeholder=' 예시) 홍길동'
                value={nameForId}
                onChange={(e) => setNameForId(e.target.value)}
              />

              <Input
                label={
                  <>
                    <p>
                      <CiMail />
                      이메일
                    </p>
                  </>
                }
                placeholder=' 가입한 이메일 입력'
                value={emailForId}
                onChange={(e) => setEmailForId(e.target.value)}
              />
              <Button onClick={() => handleFindIdButtonClick({})} type='submit'>
                찾기
              </Button>
            </div>
          </div>
        </FindIdContainer>

        <FindPasswordContainer>
          <div>
            <h2>비밀번호 찾기</h2>
            <div className='input-find-password'>
              <Input
                label={
                  <>
                    <p>
                      <PiUserCircle />
                      성명
                    </p>
                  </>
                }
                placeholder=' 예시) 홍길동'
                value={nameForPassword}
                onChange={(e) => setNameForPassword(e.target.value)}
              />

              <Input
                label={
                  <>
                    <p>
                      <CiMail />
                      이메일
                    </p>
                  </>
                }
                placeholder=' 가입한 이메일 입력'
                value={emailForPassword}
                onChange={(e) => setEmailForPassword(e.target.value)}
              />

              <Input
                label={
                  <>
                    <p>
                      <PiUserCircle />
                      아이디
                    </p>
                  </>
                }
                placeholder=' 찾을 아이디 입력'
                value={idForPassword}
                onChange={(e) => setIdForPassword(e.target.value)}
              />
              <Button onClick={() => handleFindPwButtonClick({})} type='submit'>
                찾기
              </Button>
            </div>
          </div>
          {isModalOpen && <CommonModal {...modalContent} closeModal={closeModal} />}
          {isPwModalOpen && <NewPwModal {...pwModalContent} closePwModal={closePwModal} />}
        </FindPasswordContainer>
      </form>
    </>
  );
};

export default FindInfo;
