import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  }
`;

export const FindIdContainer = styled.div`
  border-top: 1.5px solid black;
  padding-top: 1.5rem;
  padding-left: 6rem;
  margin: 50px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  h2 {
    margin-right: 2rem;
    font-size: 1.8rem;
    white-space: nowrap;
  }

  p {
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    font-size: 20px;
  }

  svg {
    color: #aaa;
    font-size: 25px;
    margin-right: 5px;
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
  padding-top: 1.7rem;
  padding-left: 5rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  h2 {
    margin-right: 1.5rem;
    font-size: 1.8rem;
    white-space: nowrap;
  }

  p {
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
    font-size: 20px;
  }

  svg {
    color: #aaa;
    font-size: 25px;
    margin-right: 5px;
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
