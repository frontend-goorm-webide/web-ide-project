import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import CommonModal from '../../components/Modal';
import NewPwModal from './NewPwModal';
import axios from 'axios';
import { PiUserCircle } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import {
  GlobalStyle,
  ErrorText,
  FindInfoLogo,
  FindIdContainer,
  FindPasswordContainer,
} from './StyleFindInfo';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/users';

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
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    // 영어 알파벳, 숫자 및 일부 특수문자(.-@)만 허용하는 정규식(한글입력불가)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // ===========================모달===========================
  // 아이디찾기 - Modal.js
  const [isModalOpen, setModalOpen] = useState(false);
  // 아이디찾기(내용) - Modal.js
  const [modalContent, setModalContent] = useState({});
  // 비밀번호찾기 - NewPwModal
  const [isPwModalOpen, setPwModalOpen] = useState(false);
  // 비밀번호찾기(내용) - NewPwModal
  const [pwModalContent, setPwModalContent] = useState({});

  // 아이디찾기 - Modal.js 열기
  const openModal = (content) => {
    setModalOpen(true);
    setModalContent(content);
  };
  // 아이디찾기 - Modal.js 닫기
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

  // 아이디찾기 버튼 클릭
  const handleFindIdButtonClick = () => {
    // 에러 모달
    if (!nameForId || !emailForId) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>모든 필드를 입력해주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('아이디 또는 이메일 필드 미입력 에러');
      // 입력 필드 초기화
      setNameForId('');
      setEmailForId('');
    } else if (!validateEmail(emailForId)) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>올바른 이메일 형식을 입력해주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('이메일 형식 에러');
      // 입력 필드 초기화
      setNameForId('');
      setEmailForId('');
    } else {
      //사용자 데이터를 모달에 표시
      openModal({
        title: '아이디 찾기',
        contents: (
          <>
            <p>
              아이디: {fetchedUser?.name} <br />
              <br />위 아이디로 다시 로그인 해주세요 :)
            </p>
          </>
        ),
        btnName: '로그인하기',
        redirectTo: '/',
      });
      // 임시 값 확인
      console.log('아이디 찾기 성공) id: ' + nameForId + ' / email: ' + emailForId);
      // 입력 필드 초기화
      setNameForId('');
      setEmailForId('');
    }
  };
  // 비밀번호찾기 버튼 클릭
  const handleFindPwButtonClick = () => {
    // 에러 모달
    if (!nameForPassword || !emailForPassword || !idForPassword) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>모든 필드를 입력해주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('이름 또는 이메일 또는 아이디 필드 미입력 에러');
      // 입력 필드 초기화
      setNameForPassword('');
      setEmailForPassword('');
      setIdForPassword('');
    } else if (!validateEmail(emailForPassword)) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>올바른 이메일 형식을 입력해주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('이메일 형식 에러');
      // 입력 필드 초기화
      setNameForPassword('');
      setEmailForPassword('');
      setIdForPassword('');
    } else {
      //비밀번호 변경 모달 실행
      openPwModal({
        title: '비밀번호 재설정',
        contents: '변경한 비밀번호로 다시 로그인 해주세요 :)',
        btnName: '로그인하기',
        redirectTo: '/',
      });
      // 임시 값 확인
      console.log(
        '비밀번호 찾기 성공) name: ' +
          nameForPassword +
          ' / email: ' +
          emailForPassword +
          ' / id: ' +
          idForPassword,
      );
      // 입력 필드 초기화
      setNameForPassword('');
      setEmailForPassword('');
      setIdForPassword('');
    }
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

      {/* 아이디찾기, 비밀번호찾기 전체 */}
      <form onSubmit={handleSubmit}>
        {/* 아이디찾기 */}
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
              {/* <CommonModal isOpen={isModalOpen} {...modalContent} close={closeModal} /> */}
            </div>
          </div>
        </FindIdContainer>

        {/* 비밀번호찾기 */}
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
              {/* <NewPwModal
                isPwOpen={isPwModalOpen}
                {...pwModalContent}
                closePwModal={closePwModal}
              /> */}
            </div>
          </div>
          <CommonModal isOpen={isModalOpen} {...modalContent} close={closeModal} />

          <NewPwModal isPwOpen={isPwModalOpen} {...pwModalContent} closePwModal={closePwModal} />
        </FindPasswordContainer>
      </form>
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
    </>
  );
};

export default FindInfo;
