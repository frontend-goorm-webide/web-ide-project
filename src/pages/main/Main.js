import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
// import { data } from '../Data';
import { Header, Body, LoginSection, LinkSection, Background } from './StyleMain';

function Main() {
  // 로그인 페이지
  // 아이디, 비밀번호 초기화
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  // 로그인 실패 에러 메세지 초기화
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행
  const clickLogin = (e) => {
    e.preventDefault();
  };

  // 로그인 버튼 클릭 함수
  const handleAlertError = () => {
    if (!userId || !userPw) {
      setAlert(true);
      console.log('모든 필드 확인'); // 임시 값 확인
    } else if (userId !== 'testid1') {
      setAlert(true);
      console.log('아이디 또는 비밀번호 재확인'); // 임시 값 확인
    } else if (userId === 'testid1') {
      console.log('로그인 성공) id: ' + userId + '/ pw: ' + userPw); // 임시 값 확인
      // 아이디, 비밀번호 초기화
      setUserId('');
      setUserPw('');
      navigate('/ide');
      return;
    }
  };

  // // data[1]의 값 가져와서 화면에 띄우기
  // useEffect(() => {
  //   const userData = data[1];
  //   setUserId(userData.userId);
  // }, []);

  // 에러 메세지 class 명
  const alertError = () => {
    return alert ? 'login-error-alert' : 'login-alert';
  };

  // 에러 메세지 문구
  const errorText = () => {
    if (!userId || !userPw) {
      return '아이디, 비밀번호를 모두 입력해주세요.';
    } else if (userId !== 'testid1') {
      return '아이디 또는 비밀번호를 다시 확인해주세요.';
    }
  };

  // 외부 화면 클릭시 에러 메세지 숨김 처리
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
                type='password'
                placeholder=' PASSWORD'
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
                onClick={() => setUserPw('')}
              />
            </div>
            <div className='loginBtn'>
              <div className={alertError()}>
                <h5>{errorText()}</h5>
                {/* <h5> 아이디 또는 비밀번호를 확인해주세요. </h5> */}
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
        {/* <LoginKakao>
          <Link to='/ide'>
            <img src='img/kakaoLogin.png' alt=''></img>
          </Link>
        </LoginKakao> */}
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
