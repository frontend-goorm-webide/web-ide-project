import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  } 
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  font-size: 18px;
  padding-top: 15px;
  text-align: center;
`;

export const FindInfoLogo = styled.span`
  display: flex;
  justify-content: center;
`;

export const FindIdContainer = styled.div`
  border-top: 1.5px solid black;
  padding-top: 1.5rem;
  padding-left: 5rem;
  margin: 50px;

  span {
    margin-right: 1.5rem;
    font-size: 1.7rem;
    white-space: nowrap;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  p {
    margin-bottom: 0.2rem;
    margin-top: 0.3rem;
    font-size: 18px;
  }

  svg {
    color: #aaa;
    font-size: 25px;
    margin-right: 3px;
  }

  p,
  svg {
    vertical-align: middle;
  }

  Input {
    margin-bottom: 1rem;
  }

  Button {
    margin-top: 1rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }
`;

export const FindPasswordContainer = styled.div`
  border-top: 1px solid black;
  margin: 50px;
  padding-top: 1.5rem;
  padding-left: 3.5rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  span {
    margin-right: 1.2rem;
    font-size: 1.7rem;
    white-space: nowrap;
  }

  p {
    margin-bottom: 0.2rem;
    margin-top: 0.3rem;
    font-size: 18px;
  }

  svg {
    color: #aaa;
    font-size: 25px;
    margin-right: 3px;
  }

  p,
  svg {
    vertical-align: middle;
  }

  Input {
    margin-bottom: 1rem;
  }

  Button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }
`;
