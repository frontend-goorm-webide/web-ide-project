import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { StyledLogo, RedLetter } from '../../components/Logo';
import { PiUserCircle } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { GlobalStyle, FindIdContainer, FindPasswordContainer } from './FindInfoStyle';
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

  return (
    <>
      <GlobalStyle />
      <form onSubmit={handleSubmit}>
        <StyledLogo>
          IDE<RedLetter>A</RedLetter>
        </StyledLogo>

        <FindIdContainer>
          <div>
            <h2>아이디 찾기</h2>
            <div className='input-find-id'>
              <p>
                <PiUserCircle />
                성명
              </p>
              <Input
                label='성명'
                placeholder=' 예시) 홍길동'
                value={nameForId}
                onChange={(e) => setNameForId(e.target.value)}
              />
              <p>
                <CiMail />
                이메일
              </p>
              <Input
                label='이메일'
                placeholder=' 가입한 이메일 입력'
                value={emailForId}
                onChange={(e) => setEmailForId(e.target.value)}
              />
              <Button
                onClick={() =>
                  openModal({
                    title: '아이디 찾기',
                    contents: '해당 아이디로 다시 로그인 해주세요:)',
                    btnName: '로그인하기',
                    redirectTo: '/', // main 페이지 이동
                  })
                }
              >
                찾기
              </Button>
            </div>
          </div>
        </FindIdContainer>

        <FindPasswordContainer>
          <div>
            <h2>비밀번호 찾기</h2>
            <div className='input-find-password'>
              <p>
                <PiUserCircle />
                성명
              </p>
              <Input
                label='성명'
                placeholder=' 예시) 홍길동'
                value={nameForPassword}
                onChange={(e) => setNameForPassword(e.target.value)}
              />
              <p>
                <CiMail />
                이메일
              </p>
              <Input
                label='이메일'
                placeholder=' 가입한 이메일 입력'
                value={emailForPassword}
                onChange={(e) => setEmailForPassword(e.target.value)}
              />
              <p>
                <PiUserCircle />
                아이디
              </p>
              <Input
                label='아이디'
                placeholder=' 찾을 아이디 입력'
                value={idForPassword}
                onChange={(e) => setIdForPassword(e.target.value)}
              />
              <Button
                onClick={() =>
                  openPwModal({
                    title: '비밀번호 재설정',
                    contents: '새로운 비밀번호로 로그인 해주세요 :)',
                    btnName: '로그인하기',
                    redirectTo: '/', // main 페이지 이동
                  })
                }
              >
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
