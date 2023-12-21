import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body{
  margin:0;
  padding:0;
  font-family: 'Open Sans', sans-serif;
}
`;

export const HeaderLogo = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding-top: 15rem;
  align-items: center;
  justify-content: center;
`;

export const StyledLogo = styled.p`
  font-family: Inter;
  font-size: 6vw;
  font-weight: 600;
  line-height: 1;
  padding-top: 5vw;
  margin-left: auto;
  margin-right: auto;
  letter-spacing: 0em;
  text-align: center;
  // color: #183258;
  color: #350dff;

  span {
    color: #e20000;
  }

  p {
    color: black;
    padding-top: 20px;
    font-size: 3vw;
  }
`;

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-right: 20px;
`;

export const FormStyle = styled.form`
  width: 60%;
  max-width: 100%;
  padding-top: 30px;
  border: 3.5px solid #ccc;
  border-radius: 50px;
  padding-left: 10px;
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  overflow: auto;

  p {
    margin: 2.5px;
    display: flex;
    align-items: center;
    margin-top: 35px;
    font-size: 18px;
  }

  svg {
    color: #aaa;
    font-size: 25px;
    margin-right: 2px;
  }
`;

export const IdInputWithBtn = styled.div`
  display: flex;
  align-items: center;
`;

export const PwInputContainer = styled.span`
  display: flex;
  align-items: center;

  span {
    padding-right: 50px;
  }
`;

export const CheckIdBtn = styled.button`
  width: 65px;
  height: 25px;
  margin-top: 67px;
  margin-left: 5px;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  border-radius: 15px;
  background-color: #d3d3d3;
  border: transparent;
  vertical-align: middle;

  &:hover {
    background-color: #e6e6e6;
  }
`;

export const StyledButtons = styled.span`
  .buttons {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding-top: 20px;
  }

  .cancel-btn {
    margin-top: 1rem;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  font-size: 18px;
  padding-top: 15px;
  text-align: center;
`;
