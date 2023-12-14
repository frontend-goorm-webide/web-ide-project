import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import Modal from 'react-modal';
import MyInfoModal from './MyInfoModal';
import {
  GlobalStyle,
  Header,
  Button,
  MainContainer,
  EditorTerminalContainer,
  ChatRoomContainer,
  ChatBar,
  ChatText,
  ChatInputContainer,
  ChatInput,
  EditorSection,
  EditorBar,
  SelectBox,
  TerminalSection,
  TerminalBar,
  TerminalContent,
} from './IdeStyle';

const IdeMain = () => {
  //훅
  //에디터에 작성한 데이터값 가져오기 위해
  const [editorData, setEditorData] = useState("");
  //에디터 언어 설정을 위해(기본값 Java)
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  //내정보 모달 창
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  // 모나코 에디터의 테마를 관리
  const [editorTheme, setEditorTheme] = useState("vs-light");
  // Header와 TerminalContent의 배경색을 관리
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  // 터미널과 채팅방의 텍스트 색상 관리
  const [Color, setColor] = useState("#000000");
  // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기
  const navigate = useNavigate();
  // 채팅방 표시 여부 상태 추가
  const [showChatRoom, setShowChatRoom] = useState(false);
  //채팅방 인풋창에 입력한 내용 가져오기
  const [chatInputText, setChatInputText] = useState("");
  // 대화 메시지 목록을 저장할 상태 변수 추가
  const [chatMessages, setChatMessages] = useState([]);



  //실행 버튼을 눌렀을 때 에디터에 작성된 데이터를 콘솔에 출력
  const onClickEditorButton = () => {
    console.log("editor Val : " + editorData);
  };
  //selectbox에서 언어를 선택
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };
  //내정보 모달 열기
  const openMyInfoModal = () => {
    setIsMyInfoModalOpen(true);
  };
  //내정보 모달 닫기
  const closeMyInfoModal = () => {
    setIsMyInfoModalOpen(false);
  };
  // 테마 변경
  const toggleEditorTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === "vs-light" ? "vs-dark" : "vs-light"));
    setBackgroundColor((prevColor) => (prevColor === "#ffffff" ? "#000000" : "#ffffff"));
    setColor((prevColor) => (prevColor === "#000000" ? "#ffffff" : "#000000"));
  };
  // 나가기 버튼을 눌렀을 때 메인 페이지로 이동
  const goToMainPage = () => {
    navigate('/');
  };
  // 채팅 버튼 누르면 채팅방 나타나기
  const toggleChatRoom = () => {
    setShowChatRoom((prevShowChatRoom) => !prevShowChatRoom);
  };
  // ChatInput에 텍스트를 입력할 때마다 해당 텍스트를 chatInputText 상태에 업데이트
  const handleChatInputChange = (e) => {
    setChatInputText(e.target.value);
  };
  // ChatInput에 입력한 값 전송
  const handleSendChatMessage = () => {
    // ChatInput에 입력한 값 콘솔에 띄우기
    console.log("Sending chat message:", chatInputText);
    //텍스트 + 현재시각
    const newMessage = { text: chatInputText, timestamp: new Date() };

    // 새 메시지로 상태 변수 업데이트
    //현재의 채팅 메시지 상태를 가져와서 새로운 메시지를 추가한 새로운 배열을 만듭니다.
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setChatInputText("");
  };
  // 엔터 키를 누르면 handleSendChatMessage 함수를 호출, 채팅 메시지를 보냄
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키의 기본 동작 방지 (새 줄이 추가되지 않도록)
      e.preventDefault();
      // 빈 값인 경우 함수 종료
      if (!chatInputText.trim()) {
        return;
      }
      handleSendChatMessage();
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header style={{ backgroundColor: backgroundColor }}>
        <h1>IDE<span style={{ color: '#E20000' }}>A</span></h1>
        <div>
          <Button onClick={toggleEditorTheme}>
            <img src='/icons/toggle-off.svg' alt='테마'>
            </img>
          </Button>
          {/* 이 버튼의 역할? */}
          <Button>
            <img src='/icons/download.svg' alt='파일저장'>
            </img>
          </Button>
          <Button onClick={openMyInfoModal}>
            <img src='/icons/person-circle.svg' alt='내정보'>
            </img>
          </Button>
          <Button onClick={goToMainPage}>
            <img src='/icons/box-arrow-right.svg' alt='나가기'></img>
          </Button>
        </div>
      </Header>

      <Modal
        isOpen={isMyInfoModalOpen}
        onRequestClose={closeMyInfoModal}
        contentLabel="MyInfo Modal"
      >
        <MyInfoModal onRequestClose={closeMyInfoModal} />
      </Modal>

      <MainContainer>
        <EditorTerminalContainer>
          <EditorSection>
            <EditorBar>
              <div>
                {/* 선택할 수 있는 언어로는 Java, JavaScript, Python 세 가지 */}
                <SelectBox value={selectedLanguage} onChange={(e) => handleLanguageSelect(e.target.value)}>
                  <option value="java">Java</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </SelectBox>
                <Button onClick={onClickEditorButton}>
                  <img src='/icons/play-circle.svg' alt='실행'>
                  </img>
                </Button>
              </div>
            </EditorBar>

            <MonacoEditor
              width="800px"
              height="100%"
              language={selectedLanguage}
              theme={editorTheme}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto'
                }
              }}
              //에디터가 비어있을 때 기본 문구 출력, 내용이 있으면 내용 유지
              value={editorData ||
                `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n`
              }
              onChange={(e) => setEditorData(e)}
            />
          </EditorSection>

          <TerminalSection>
            <TerminalBar>
              <div>
                <p>터미널</p>
                <Button onClick={toggleChatRoom}>
                  <img src='/icons/chat-dots.svg' alt='logo'></img>
                </Button>
              </div>
            </TerminalBar>
            <TerminalContent style={{ backgroundColor: backgroundColor }}>
              <sapan style={{ color: Color }}>결과값</sapan>
            </TerminalContent>
          </TerminalSection>
        </EditorTerminalContainer>

        <ChatRoomContainer style={{ display: showChatRoom ? 'block' : 'none' }}>
          <ChatBar>
            <p>
              <img src='/icons/chat-dots.svg' alt='logo'></img>
              채팅방
            </p>
            <Button onClick={toggleChatRoom}>X</Button>
          </ChatBar>

          <ChatText style={{ backgroundColor: backgroundColor, color: Color }}>
            대화 기록
            {/* chatMessages 배열을 순회 */}
            {chatMessages.map((message, index) => (
              <div key={index}>
                {/* 각 메시지(시간:메세지 내용)를 화면에 표시하는 컴포넌트를 생성 */}
                아이디:<strong>{message.text}</strong>{message.timestamp.toLocaleTimeString()}
              </div>
            ))}
          </ChatText>

          <ChatInputContainer style={{ backgroundColor: backgroundColor }}>
            <Button>+</Button>
            <ChatInput placeholder="Type your message..."
              value={chatInputText}
              onChange={handleChatInputChange}
              onKeyDown={handleEnterKey}
            />
          </ChatInputContainer>
        </ChatRoomContainer>
      </MainContainer>
    </>
  );
};

export default IdeMain;
