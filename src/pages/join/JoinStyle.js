import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body{
  margin:0;
  padding:0;
  margin-left:10rem;
  font-family: 'Open Sans', sans-serif;
}
`;

export const FormStyle = styled.form`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

export const Header = styled.div`
  width: 30%;
  display: inline-block;

  h2 {
    display: flex;
    justify-content: flex-start;
  }
`;

export const MainContainer = styled.div`
  width: 70%; 
  display: inline-block; 
  }
`;

export const CheckPwInput = styled.div`
  // import React from 'react';
  // import styled from 'styled-components';

  // const Container = styled.div
`;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   color: #E63946; /* Replace with the exact color code from your design */
//   margin-bottom: 24px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 100%; /* Set to the width of your form */
//   max-width: 500px; /* Adjust as needed */
// `;

// const Input = styled.input`
//   padding: 10px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc; /* Replace with your color code */
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #457B9D; /* Replace with your color code */
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-bottom: 16px;

//   &:hover {
//     background-color: #1D3557; /* Darker shade for hover effect */
//   }
// `;

// const LinkButton = styled(Button)`
//   background-color: transparent;
//   color: #457B9D; /* Replace with your color code */
//   text-decoration: underline;

//   &:hover {
//     background-color: transparent;
//     color: #1D3557;
//   }
// `;

// function SignupForm() {
//   return (
//     <Container>
//       <Title>Create Account</Title>
//       <Form>
//         <Input type="text" placeholder="성명(이름 측성)" required />
//         <Input type="text" placeholder="아이디(사용할 아이디 입력)" required />
//         <Input type="password" placeholder="비밀번호(영문, 숫자 포함 8자리 이상)" required />
//         <Input type="email" placeholder="이메일(example@gmail.com)" required />
//         <Input type="text" placeholder="휴대전화번호(예시) 01012345678" required />
//         <Button type="submit">가입</Button>
//         <LinkButton type="button">회원가입 약관</LinkButton>
//       </Form>
//     </Container>
//   );
// }

// export default SignupForm;
