import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import { PiUserCircle } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { GlobalStyle, FindIdContainer, FindPasswordContainer } from './FindInfoStyle';

// FindInfo 컴포넌트
const FindInfo = () => {
  const [nameForId, setNameForId] = useState('');
  const [emailForId, setEmailForId] = useState('');

  const [nameForPassword, setNameForPassword] = useState('');
  const [emailForPassword, setEmailForPassword] = useState('');
  const [idForPassword, setIdForPassword] = useState('');

  // 버튼 클릭 핸들러
  const handleNewButtonClick = () => {
    console.log('버튼 클릭!');
  };

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

  return (
    <>
      <GlobalStyle />
      <form onSubmit={handleSubmit}>
        <Logo />

        <FindIdContainer>
          <div>
            <h2>아이디 찾기</h2>
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
              <Button onClick={handleNewButtonClick} type='submit'>
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
              <Button onClick={handleNewButtonClick} type='submit'>
                찾기
              </Button>
            </div>
          </div>
        </FindPasswordContainer>
      </form>
    </>
  );
};

export default FindInfo;
