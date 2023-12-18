// import styled, { createGlobalStyle } from 'styled-components';

import styled from 'styled-components';

export const Header = styled.div`
  margin-top: 100px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
  margin-top: 70px;
`;

export const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .input {
    & > * + * {
      margin-top: 20px;
    }
  }
  .loginBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
  .login-alert {
    visibility: hidden;
  }
  .login-error-alert {
    // display: flex;
    color: red;
  }
`;

export const LinkSection = styled.div`
  display: flex;
  gap: 80px; /* 각 링크 간의 간격 조절 */
  margin-top: 20px; /* 링크들과 로그인 폼 사이 간격 조절 */
  justify-content: center;
`;

export const LoginKakao = styled.form`
  margin-top: 80px;
  // border-top: 1.5px solid black;
`;

export const Background = styled.svg`
  position: absolute;
  top: 50px;
  right: 50%;
  transform: translateX(50%);
  width: 800px;
  height: 870px;
  flex-shrink: 0;
  z-index: -100;
`;
// export const LoginForm = styled.form`
//   margin-top: 30px;
//   & > * + * {
//     margin-top: 20px;
//   }
// `;

// export const LoginInput = styled.form`
//   margin-top: 30px;
//   & > * + * {
//     margin-top: 20px;
//   }
// `;

// export const LoginBtn = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 35px;
//   .login-alert {
//     visibility: hidden;
//   }
//   .login-error-alert {
//     // display: flex;
//     color: red;
//   }
// `;

// export const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 0;
//     font-family: 'Open Sans', sans-serif;
//   }
// `;
