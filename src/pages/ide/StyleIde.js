import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export const Header = styled.header`
  background-color: #ffffff;
  color: #183258;
  text-align: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 5px solid #0a562d;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const Button = styled.button`
  color: #000000;
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  margin-left: 8px;
  background-color: #d9d9d9;

  &:hover {
    cursor: pointer;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const EditorTerminalContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ChatRoomContainer = styled.div`
  width: 300px;
  height: 100%;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ChatBar = styled.div`
  background-color: #d9d9d9;
  color: #ffffff;
  text-aline: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    margin-left: 10px;
  }
`;

export const ChatText = styled.div`
  background-color: #ffffff;
  color: #183258;
  overflow-y: auto;
  height: 100%;
  padding: 10px;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #0a562d;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 6px;
  margin-top: 2px;
`;

//에디터
export const EditorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const EditorBar = styled.div`
  background-color: #d9d9d9;
  color: #ffffff;
  text-align: center;
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SelectBox = styled.select`
  padding: 8px 16px;
`;

//터미널
export const TerminalSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TerminalBar = styled.div`
  background-color: #d9d9d9;
  color: #ffffff;
  text-align: center;
  width: 100%;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div p {
    margin-left: 10px;
  }
`;

export const TerminalContent = styled.div`
  width: 100%;
  height: 350px;
  color: #00ff00;
`;
