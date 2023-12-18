import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Header, Body, LoginSection, LinkSection, LoginKakao, Background } from './MainStyle';

function Main() {
  // id, pw 입력 Input 설정
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [alert, setAlert] = useState(false);

  // 로그인 버튼 클릭 시 실행
  const clickLogin = (e) => {
    e.preventDefault();
    console.log(userId, userPw); // 임시 값 확인
    //값 초기화
    setUserId('');
    setUserPw('');
    // setAlert(false);
  };

  const alertError = () => {
    // alertError 함수 선언
    return alert ? 'login-error-alert' : 'login-alert';
  };

  const handleAlertError = () => {
    if (!userId || !userPw) {
      setAlert(true);
      // alertError();
    }
  };
  // 외부 화면 클릭시 에러메시지 값 변경
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 클릭된 요소가 alert 영역 내부인지 확인
      if (!event.target.closest('.login-error-alert')) {
        setAlert(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Body>
        서비스 이용을 위해 로그인 해주세요 :)
        <form onSubmit={clickLogin}>
          <LoginSection>
            <div className='input'>
              <Input placeholder=' ID' value={userId} onChange={(e) => setUserId(e.target.value)} />
              <Input
                placeholder=' PASSWORD'
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
              />
            </div>
            <div className='loginBtn'>
              <div className={alertError()}>
                <h5> 아이디 또는 비밀번호를 확인해주세요. </h5>
              </div>
              <Button onClick={() => handleAlertError({})} type='submit'>
                로그인
              </Button>
            </div>
          </LoginSection>
        </form>
        <LinkSection>
          <Link to='/findinfo' style={{ color: 'black', textDecoration: 'none' }}>
            아이디/비밀번호 찾기
          </Link>
          <Link to='/join' style={{ color: 'black', textDecoration: 'none' }}>
            회원가입
          </Link>
        </LinkSection>
        {/* 카카오 로그인 시 이동 경로 수정 필요 */}
        <LoginKakao>
          <Link to='/ide'>
            <img src='img/kakaoLogin.png' alt=''></img>
          </Link>
        </LoginKakao>
      </Body>
      <Background xmlns='http://www.w3.org/2000/svg' fill='none'>
        <path
          opacity='0.3'
          d='M2.5 50C2.5 23.7665 23.7665 2.5 50 2.5H750C776.234 2.5 797.5 23.7665 797.5 50V820C797.5 846.233 776.234 867.5 750 867.5H50C23.7665 867.5 2.5 846.234 2.5 820V50Z'
          stroke='#D9D9D9'
          strokeWidth='5'
        />
      </Background>
    </>
  );
}

export default Main;
