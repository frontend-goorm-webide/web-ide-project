import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { PiUserCircle } from 'react-icons/pi';
import { MdAlternateEmail } from 'react-icons/md';
import styled from 'styled-components';
import { StyledLogo, RedLetter } from '../../components/Logo';

const PageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

// FindInfo 컴포넌트
const FindInfo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 제출 로직
    console.log(name, email, id);

    // console.log대신 API호출
    // 예: await axios.post('/api/userinfo', { username, email });

    // 입력 필드 초기화
    setName('');
    setEmail('');
    setId('');
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <StyledLogo>
          IDE<RedLetter>A</RedLetter>
        </StyledLogo>

        <h2>아이디 찾기</h2>
        <div className='input-name'>
          <PiUserCircle /> 성명
          <Input
            label='성명'
            placeholder=' 예시) 홍길동'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='input-email'>
          <MdAlternateEmail /> 이메일
          <Input
            label='이메일'
            placeholder=' 가입한 이메일 입력'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type='submit'>찾기</Button>

        <h2>비밀번호 찾기</h2>
        <div className='input-name'>
          <PiUserCircle /> 성명
          <Input
            label='성명'
            placeholder=' 예시) 홍길동'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='input-email'>
          <MdAlternateEmail /> 이메일
          <Input
            label='이메일'
            placeholder=' 가입한 이메일 입력'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-id'>
          <PiUserCircle /> 아이디
          <Input
            label='아이디'
            placeholder=' 찾을 아이디 입력'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <Button type='submit'>찾기</Button>
      </form>
    </PageContainer>
  );
};

export default FindInfo;
