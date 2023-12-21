import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { PiUserCircle } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoGlobeOutline } from 'react-icons/io5';
import {
  GlobalStyle,
  HeaderLogo,
  FormStyle,
  PageLayout,
  CheckIdBtn,
  StyledLogo,
  IdInputWithBtn,
  StyledButtons,
  PwInputContainer,
} from './StyleJoin';

const Join = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setId('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setMobile('');
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <PageLayout>
        <GlobalStyle />
        <HeaderLogo>
          <StyledLogo>
            <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
              IDE<span>A</span>
            </Link>
            <p>Create Account</p>
          </StyledLogo>
        </HeaderLogo>

        <FormStyle>
          <form onSubmit={handleSubmit}>
            <Input
              label={
                <>
                  <p>
                    <PiUserCircle />
                    성명(*)
                  </p>
                </>
              }
              placeholder=' 예시) 홍길동'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <IdInputWithBtn>
              <Input
                label={
                  <>
                    <p>
                      <PiUserCircle />
                      아이디(*)
                    </p>
                  </>
                }
                placeholder=' 사용할 아이디 입력'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <CheckIdBtn type='submit'>중복 확인</CheckIdBtn>
            </IdInputWithBtn>
            <PwInputContainer>
              <Input
                label={
                  <>
                    <p>
                      <RiLockPasswordLine />
                      비밀번호(*)
                    </p>
                  </>
                }
                placeholder=' 영문, 숫자 포함 최소 8자리 이상'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label={
                  <>
                    <p>
                      <RiLockPasswordLine />
                      비밀번호 확인(*)
                    </p>
                  </>
                }
                placeholder=' 입력한 비밀번호 재입력'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </PwInputContainer>
            <Input
              label={
                <>
                  <p>
                    <CiMail />
                    이메일(*)
                  </p>
                </>
              }
              placeholder=' 예시) example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label={
                <>
                  <p>
                    <IoGlobeOutline />
                    휴대전화번호
                  </p>
                </>
              }
              placeholder=' 예시) 01012345678'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <StyledButtons>
              <div className='buttons'>
                <Button onClick={handleButtonClick} type='submit' className='cancel-btn'>
                  취소
                </Button>
                <Button onClick={handleButtonClick} type='submit'>
                  회원가입 완료
                </Button>
              </div>
            </StyledButtons>
          </form>
        </FormStyle>
      </PageLayout>
    </>
  );
};

export default Join;
