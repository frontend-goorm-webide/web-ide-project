import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CommonModal from '../../components/Modal';
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
  ErrorText,
} from './StyleJoin';

const Join = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  //취소 버튼 클릭
  const navigate = useNavigate();
  const handleCancelBtn = () => {
    navigate('/');
  };

  //아이디 중복확인 검사 함수
  const handleIdDuplicationCheck = (event) => {
    event.preventDefault();

    if (!validateId(id)) {
      openModal({
        title: '입력 오류',
        contents: (
          <ErrorText>
            아이디는 4~10글자사이로, 특수문자를 제외한 영문 대문자 또는 소문자를 포함하고, 숫자를
            반드시 포함하여야 합니다.
          </ErrorText>
        ),
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('아이디 형식 에러');
      // 입력 필드 초기화
      setId('');
    } else {
      openModal({
        title: '중복 확인',
        contents: '사용할수 있는 아이디입니다.',
        btnName: '닫기',
        redirectTo: null,
      });
      console.log('아이디 중복확인 성공');
    }
  };

  const handlePwDuplicationCheck = (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      openModal({
        title: '입력 오류',
        contents: (
          <ErrorText>
            비밀번호는 8~16글자사이로, 영어 대문자, 소문자, 숫자, 특수문자 각 1개씩 반드시
            포함하여야 합니다.
          </ErrorText>
        ),
        btnName: '닫기',
        redirectTo: null,
      });
    } else if (password !== confirmPassword) {
      openModal({
        title: '비밀번호 중복확인 오류',
        contents: <ErrorText>비밀번호가 동일하지 않습니다. 다시 입력해 주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      setConfirmPassword('');
    } else {
      openModal({
        title: '비밀번호 중복확인',
        contents: (
          <>
            <p>비밀번호 중복확인이 되었습니다.</p>
          </>
        ),
        btnName: '닫기',
        redirectTo: null,
      });
      console.log('비밀번호 중복확인 성공');
    }
  };

  // 성명 유효성 검사 함수
  const validateName = (name) => {
    // 특수문자, 공백, 숫자 제외, 영문 대소문자와 한글만 허용, 길이는 2~10자
    const nameRegex = /^[a-zA-Z가-힣]{2,10}$/;
    return nameRegex.test(name);
  };

  //아이디 유효성 검사 함수
  const validateId = (id) => {
    // 영문 대소문자와 숫자만 허용, 길이는 4~10자
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,10}$/;
    return idRegex.test(id);
  };

  //비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 8~16자 영문 대소문자, 숫자, 특수문자 포함
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    // 영어 알파벳, 숫자 및 일부 특수문자(.-@)만 허용하는 정규식(한글입력불가)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  //휴대전화번호 유효성 검사 함수
  const validateMobileNumber = (mobile) => {
    const mobileNumberRegex = /^01\d{8,9}$/;
    return mobileNumberRegex.test(mobile);
  };

  //===========================모달===========================
  // 아이디찾기 - Modal.js
  const [isModalOpen, setModalOpen] = useState(false);
  // 아이디찾기(내용) - Modal.js
  const [modalContent, setModalContent] = useState({});

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

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!name || !id || !password || !confirmPassword || !email) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>모든 필드를 입력해주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      console.log('필드중 하나 혹은 여러개 미입력 ');
    } else if (!validateName(name)) {
      openModal({
        title: '입력 오류',
        contents: (
          <ErrorText>
            이름은 2자이상 10자 이하의 영문 또는 한글이어야 합니다. <br />
            (특수문자, 공백, 숫자 제외)
          </ErrorText>
        ),
        btnName: '닫기',
        redirectTo: null,
      });
      console.log('이름 형식 에러');
      setName('');
    } else if (!validateId(id)) {
      openModal({
        title: '입력 오류',
        contents: (
          <ErrorText>
            아이디는 4~10글자사이로, 특수문자를 제외한 영문 대문자 또는 소문자를 포함하고, 숫자를
            반드시 포함하여야 합니다.
          </ErrorText>
        ),
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('아이디 형식 에러');
      // 입력 필드 초기화
      setId('');
    } else if (!validatePassword(password)) {
      openModal({
        title: '입력 오류',
        contents: (
          <ErrorText>
            비밀번호는 8~16자사이로, 반드시 영문 대문자, 소문자, 숫자, 특수문자 각 1개씩은
            포함되어야 합니다.
          </ErrorText>
        ),
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('비밀번호 형식 에러');
      // 입력 필드 초기화
      setPassword('');
    } else if (!validateEmail(email)) {
      openModal({
        title: '입력 오류',
        contents: <ErrorText>올바른 이메일 형식을 입력해주세요.</ErrorText>,
        btnName: '닫기',
        redirectTo: null,
      });
      // 임시 값 확인
      console.log('이메일 형식 에러');
      // 입력 필드 초기화
      setEmail('');
    }
    // else if (!validateMobileNumber(mobile)) {
    //   openModal({
    //     title: '입력 오류',
    //     contents: <ErrorText>휴대폰 번호 형식이 올바르지 않습니다.</ErrorText>,
    //     btnName: '닫기',
    //     redirectTo: null,
    //   });
    //   // 임시 값 확인
    //   console.log('휴대번호 형식 에러');
    //   // 입력 필드 초기화
    //   setMobile('');
    // }
    else {
      // 모든 필드조건이 맞을경우
      // 회원가입 성공 로직
      openModal({
        title: '회원가입 성공',
        contents: (
          <>
            <p>회원가입이 완료되었습니다. 메인페이지에서 로그인 해주세요 :)</p>
          </>
        ),
        btnName: '로그인하기',
        redirectTo: '/',
      });
      console.log('회원가입 성공');
      setName('');
      setId('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setMobile('');
    }
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
          <form onSubmit={handleSignupSubmit}>
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
                placeholder=' 영문 대문자 혹은 소문자 포함, 숫자 필수'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <CheckIdBtn onClick={handleIdDuplicationCheck} type='submit'>
                중복 확인
              </CheckIdBtn>
            </IdInputWithBtn>
            <PwInputContainer>
              <span>
                <Input
                  label={
                    <>
                      <p>
                        <RiLockPasswordLine />
                        비밀번호(*)
                      </p>
                    </>
                  }
                  placeholder=' 영어 대&소문자, 숫자, 특수문자 각 1개
                  포함'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />
              </span>

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
                type='password'
              />
              <CheckIdBtn onClick={handlePwDuplicationCheck} type='submit'>
                중복 확인
              </CheckIdBtn>
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
                <Button onClick={handleCancelBtn} type='submit' className='cancel-btn'>
                  취소
                </Button>
                <Button onClick={handleSignupSubmit} type='submit'>
                  회원가입 완료
                </Button>
              </div>
              <CommonModal isOpen={isModalOpen} {...modalContent} close={closeModal} />
            </StyledButtons>
          </form>
        </FormStyle>
      </PageLayout>
    </>
  );
};

export default Join;
