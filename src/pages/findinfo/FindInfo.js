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
  const [nameForId, setNameForId] = useState('');
  const [emailForId, setEmailForId] = useState('');

  const [nameForPassword, setNameForPassword] = useState('');
  const [emailForPassword, setEmailForPassword] = useState('');
  const [idForPassword, setIdForPassword] = useState('');

  // 서버에서 가져온 사용자 데이터를 저장하기 위한 state
  const [fetchedUser, setFetchedUser] = useState(null);

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 제출 로직
    console.log(nameForId, emailForId, nameForPassword, emailForPassword, idForPassword);

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
    // 영어 알파벳, 숫자 및 일부 특수문자(.-@)만 허용하는 정규식(한글입력불가)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
        {/* <Link>
          <Logo to='/' />
        </Link> */}
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
              {/* <Button
                onClick={() =>
                  openPwModal({
                    title: '비밀번호 재설정',
                    contents: '새로운 비밀번호로 로그인 해주세요 :)',
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
          {isModalOpen && <CommonModal {...modalContent} closeModal={closeModal} />}
          {isPwModalOpen && <NewPwModal {...pwModalContent} closePwModal={closePwModal} />}
        </FindPasswordContainer>
      </form>
    </>
  );
};

export default FindInfo;
