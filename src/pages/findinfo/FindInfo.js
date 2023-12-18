import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import axios from 'axios';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/users';

// FindInfo 컴포넌트
const FindInfo = () => {
  // 아이디찾기 - 이름, 이메일
  const [nameForId, setNameForId] = useState('');
  const [emailForId, setEmailForId] = useState('');
  // 비밀번호찾기 - 이름, 이메일, 아이디
  const [nameForPassword, setNameForPassword] = useState('');
  const [emailForPassword, setEmailForPassword] = useState('');
  const [idForPassword, setIdForPassword] = useState('');

  // 서버에서 가져온 사용자 데이터를 저장하기 위한 state
  const [fetchedUser, setFetchedUser] = useState(null);

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 임시 값 확인
    console.log(nameForId, emailForId, nameForPassword, emailForPassword, idForPassword);

    // 입력 필드 초기화
    setNameForId('');
    setEmailForId('');
    setNameForPassword('');
    setEmailForPassword('');
    setIdForPassword('');
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    // 영어 알파벳, 숫자 및 일부 특수문자(.-@)만 허용하는 정규식(한글입력불가)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 아이디찾기 버튼 클릭 : 에러 모달
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
      //사용자 데이터를 모달에 표시
      openModal({
        title: '아이디 찾기 결과',
        contents: (
          <>
            <p>아이디: {fetchedUser?.name}</p>
          </>
        ),
        btnName: '로그인하기',
        redirectTo: '/', // main 페이지 이동
      });
    }
  };
  // 비밀번호찾기 버튼 클릭 : 에러 모달
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
      //비밀번호 변경 모달 실행
      openPwModal({
        title: '아이디 찾기',
        contents: '해당 비밀번호로 다시 로그인 해주세요:)',
        btnName: '비밀번호 변경',
        redirectTo: '/', // main 페이지 이동
      });
    }
  };

  // ===========================모달===========================
  // 아이디찾기 - 공통 Modal
  const [isModalOpen, setModalOpen] = useState(false);
  // 아이디찾기(내용) - 공통 Modal
  const [modalContent, setModalContent] = useState({});
  // 비밀번호찾기 - NewPwModal
  const [isPwModalOpen, setPwModalOpen] = useState(false);
  // 비밀번호찾기(내용) - NewPwModal
  const [pwModalContent, setPwModalContent] = useState({});

  // 아이디찾기 - 공통 Modal 열기
  const openModal = (content) => {
    setModalOpen(true);
    setModalContent(content);
  };
  // 아이디찾기 - 공통 Modal 닫기
  const closeModal = () => {
    setModalOpen(false);
    setModalContent({});
  };
  // 비밀번호찾기 - NewPwModal 열기
  const openPwModal = (content) => {
    setPwModalOpen(true);
    setPwModalContent(content);
  };
  // 비밀번호찾기 - NewPwModal 닫기
  const closePwModal = () => {
    setPwModalOpen(false);
    setPwModalContent({});
  };
  // ===========================모달===========================

  useEffect(() => {
    axios
      .get(SERVER_URL)
      .then((response) => {
        setFetchedUser(response.data[0]); // 첫 번째 사용자 데이터를 state에 저장
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <FindInfoLogo>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
      </FindInfoLogo>
      <form onSubmit={handleSubmit}>
        {' '}
        {/* 아이디찾기, 비밀번호찾기 전체 */}
        <FindIdContainer>
          {' '}
          {/* 아이디찾기 */}
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
              {/* <Button
                onClick={() =>
                  openModal({
                    title: '아이디 찾기',
                    contents: '해당 아이디로 다시 로그인 해주세요:)',
                    btnName: '로그인하기',
                    redirectTo: '/', // main 페이지 이동
                  })
                }
                type='submit'
              >
                찾기
              </Button> */}
            </div>
          </div>
        </FindIdContainer>
        <FindPasswordContainer>
          {' '}
          {/* 비밀번호찾기 */}
          <div>
            <span>비밀번호 찾기</span>
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
