import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Input from '../../components/Input';

function Main() {
  // id, pw 입력 Input 설정
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  // 로그인 버튼 클릭 시 실행
  const clickLogin = (e) => {
    e.preventDefault();
    console.log(userId, userPw); // 임시 값 확인
    //값 초기화
    setUserId('');
    setUserPw('');
  };

  return (
    <>
      <form onSubmit={clickLogin}>
        <Logo />
        <div>
          서비스 이용을 위해 로그인 해주세요 :)
          <Input placeholder=' ID' value={userId} />
          <Input placeholder=' PASSWORD' value={userPw} />
          <Button>로그인</Button>
        </div>
      </form>
      <Link to='/findinfo' style={{ color: 'black', textDecoration: 'none' }}>
        아이디/비밀번호 찾기
      </Link>
      <br></br>
      <Link to='/join' style={{ color: 'black', textDecoration: 'none' }}>
        회원가입
      </Link>
      <br />
      {/* 카카오 로그인 시 이동 경로 수정 필요 */}
      <Link to='/ide'>
        <img src='img/kakaoLogin.png' alt=''></img>
      </Link>
    </>
  );
}

export default Main;
