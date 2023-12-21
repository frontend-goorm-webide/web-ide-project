import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonModal from '../../components/Modal';
import MyInfoModal from './MyInfoModal';
import MonacoEditor from 'react-monaco-editor';
import { BsToggles } from 'react-icons/bs';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegPlayCircle } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import SockJS from 'sockjs-client';
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
} from './StyleIde';

const IdeMain = () => {
  // ===========================상단바===========================
  // useNavigate 훅을 사용하여 페이지 이동 함수 가져오기
  const navigate = useNavigate();
  // 나가기 버튼을 눌렀을 때 메인 페이지로 이동
  const goToMainPage = () => {
    // 로그아웃 시 알림창 표시
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  // 모나코 에디터의 테마를 관리
  const [editorTheme, setEditorTheme] = useState('vs-light');
  // Header와 TerminalContent의 배경색을 관리
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  // 터미널과 채팅방의 텍스트 색상 관리
  const [color, setColor] = useState('#000000');
  // 테마 변경
  const toggleEditorTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === 'vs-light' ? 'vs-dark' : 'vs-light'));
    setBackgroundColor((prevColor) => (prevColor === '#ffffff' ? '#000000' : '#ffffff'));
    setColor((prevColor) => (prevColor === '#000000' ? '#ffffff' : '#000000'));
  };
  // ===========================상단바===========================

  // ===========================에디터===========================
  // 에디터에 작성한 데이터값 가져오기 위해
  const [editorData, setEditorData] = useState('');
  // 실행 버튼을 눌렀을 때 에디터에 작성된 데이터를 콘솔에 출력
  const onClickEditorButton = () => {
    console.log('editor Val : ' + editorData);
  };
  // 에디터 언어 설정을 위해(기본값 Java)
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  // selectbox에서 언어를 선택
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };
  // ===========================에디터===========================

  // ===========================터미널===========================
  // 채팅 버튼 누르면 채팅방 나타나기
  const toggleOpenChatRoom = () => {
    setShowChatRoom(true);
  };
  // 채팅 버튼 누르면 채팅방 나가기
  const toggleCloseChatRoom = () => {
    setShowChatRoom(false);
  };
  // ===========================터미널===========================

  // ===========================채팅===========================
  // 채팅방 표시 여부 상태 추가
  const [showChatRoom, setShowChatRoom] = useState(false);
  // 채팅방 인풋창에 입력한 내용 가져오기
  const [chatInputText, setChatInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  // ChatInput에 텍스트를 입력할 때마다 해당 텍스트를 chatInputText 상태에 업데이트
  const handleChatInputChange = (e) => {
    setChatInputText(e.target.value);
  };
  // ChatInput에 입력한 값 콘솔에 띄우기
  const handleSendChatMessage = () => {
    console.log('Sending chat message:', chatInputText);

    // Socket 파트 추가
    // 아이디 추가 사항
    if (sock && sock.readyState === SockJS.OPEN) {
      sock.send(JSON.stringify({ text: chatInputText, timestamp: new Date() }));
    } else {
      // 연결이 열려 있지 않을 때 사용자에게 알림 등을 표시할 수 있음
      console.error('WebSocket is not open.');
    }

    // 인풋값 확인 테스트용
    const newMessage = { text: chatInputText, timestamp: new Date() };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setChatInputText('');
  };
  // 채팅창에 한글 두번 출력되는 걸 방지하는 프로퍼티 생성
  const [isComposing, setIsComposing] = useState(false);
  // 엔터 키를 누르면 handleSendChatMessage 함수를 호출, 채팅 메시지를 보냄
  const handleEnterKey = (e) => {
    if (isComposing) return;
    if (e.key === 'Enter') {
      // 엔터 키의 기본 동작 방지 (새 줄이 추가되지 않도록)
      e.preventDefault();
      handleSendChatMessage();
    }
  };
  // 소켓 파트
  const [sock, setSock] = useState(null);

  useEffect(() => {
    // SockJS 인스턴스 생성
    const newSock = new SockJS('http://localhost:3000/ide');
    setSock(newSock);

    // 소켓 열림 이벤트 핸들러 등록
    newSock.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');
    };

    // 메시지 수신 이벤트 핸들러 등록
    newSock.onmessage = (event) => {
      const message = event.data;
      console.log('새로운 메시지:', message);

      // 채팅 메시지 배열 업데이트
      setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    // 소켓 닫힘 이벤트 핸들러 등록
    newSock.onclose = () => {
      console.log('WebSocket 연결이 닫혔습니다.');
    };

    // 컴포넌트 언마운트 시 소켓 닫기
    return () => {
      if (newSock) {
        newSock.close();
      }
    };
  }, []);
  // ===========================채팅===========================

  // ===========================모달===========================
  // 내정보 MyInfoModal 열기 초기화
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);

  // 내정보 MyInfoModal 열기 함수
  const openMyInfoModal = () => {
    setIsMyInfoModalOpen(true);
    console.log('내정보 모달 열기) 내정보 요청');
  };
  // 내정보 MyInfoModal 닫기 함수
  const closeMyInfoModal = () => {
    setIsMyInfoModalOpen(false);
  };

  // 회원 탈퇴 모달(Modal.js) 열기 초기화
  const [isModalOpen, setModalOpen] = useState(false);
  // 회원 탈퇴 모달(Modal.js) 내용 초기화
  const [modalContent, setModalContent] = useState({});

  // 회원 탈퇴 모달(Modal.js) 열기 함수
  const openModal = (content) => {
    setModalOpen(true);
    setModalContent(content);
    closeMyInfoModal(); // 회원탈퇴 모달 열면서 내정보 모달 닫기
    console.log('회원탈퇴 요청) 탈퇴처리여부: true');
  };
  // 회원 탈퇴 모달(Modal.js) 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
    setModalContent({});
    console.log('회원탈퇴 완료');
  };
  // ===========================모달===========================

  // ===========================api===========================
  // 로그아웃 api 요청
  useEffect(() => {
    axios
      .post('http://localhost:8080/api/users/logout', {
        headers: {
          Token: 'token-value',
        },
      })
      .then((response) => {
        // 성공적으로 응답을 받았을 때의 처리
        console.log('서버 응답:', response.data);
        // 응답이 성공적으로 왔을 때(http의 응답메세지 start-line 값 == 200)
        // 메인 페이지로 이동
        if (response.status === 200) {
          // 여기에 적절한 페이지 이동 로직을 추가
          goToMainPage();
        }
        // 토큰을 지우는 로직 추가 한다면
        // localStorage.removeItem('token');
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error('에러 발생:', error);
      });
  }, []);
  // 컴파일-코드실행 api 요청
  const [codeRun, setCodeRun] = useState('');

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/ide/run-code', {
        headers: {
          Token: 'token-value',
        },
      })
      .then((response) => {
        // 성공적으로 응답을 받았을 때의 처리
        console.log('서버 응답:', response.data);

        // 응답 데이터에서 필요한 정보를 추출
        const resultData = response.data;
        setCodeRun(resultData.code);
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error('에러 발생:', error);
      });
  }, []);
  // ===========================api===========================

  return (
    <>
      <GlobalStyle />
      <Header style={{ backgroundColor: backgroundColor }}>
        <h1>
          IDE<span style={{ color: '#E20000' }}>A</span>
        </h1>
        <div>
          {/* 테마변경 */}
          <Button onClick={toggleEditorTheme}>
            <BsToggles />
          </Button>
          {/* 내정보 */}
          <Button onClick={openMyInfoModal}>
            <IoPersonCircleOutline />
          </Button>
          <MyInfoModal
            isMyInfoOpen={isMyInfoModalOpen}
            closeMyInfo={closeMyInfoModal}
            open={openModal}
          />
          <CommonModal isOpen={isModalOpen} {...modalContent} close={closeModal} />
          {/* 로그아웃 onClick={goToMainPage} */}
          <Button>
            <IoIosLogOut />
          </Button>
        </div>
      </Header>

      <MainContainer>
        <EditorTerminalContainer>
          <EditorSection>
            <EditorBar>
              <div>
                {/* 선택할 수 있는 언어로는 Java, JavaScript, Python 세 가지 */}
                <SelectBox
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageSelect(e.target.value)}
                >
                  <option value='java'>Java</option>
                  <option value='javascript'>JavaScript</option>
                  <option value='python'>Python</option>
                </SelectBox>
                <Button onClick={onClickEditorButton}>
                  <FaRegPlayCircle />
                  실행
                </Button>
              </div>
            </EditorBar>

            <MonacoEditor
              width='100%'
              height='100%'
              language={selectedLanguage}
              theme={editorTheme}
              options={{ fontSize: 14, scrollBeyondLastLine: false, minimap: { enabled: false } }}
              // 에디터가 비어있을 때 기본 문구 출력, 내용이 있으면 내용 유지
              value={
                editorData ||
                `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n`
              }
              onChange={(e) => setEditorData(e)}
            />
          </EditorSection>

          <TerminalSection>
            <TerminalBar>
              <div>
                <p>터미널</p>
                <Button onClick={toggleOpenChatRoom}>
                  <BsChatDots />
                </Button>
              </div>
            </TerminalBar>
            <TerminalContent style={{ backgroundColor: backgroundColor }}>
              <span style={{ color: color }}>결과값</span>
              <br />
              <div>{codeRun}</div>
            </TerminalContent>
          </TerminalSection>
        </EditorTerminalContainer>

        <ChatRoomContainer style={{ display: showChatRoom ? 'block' : 'none' }}>
          <ChatBar>
            <p>
              <BsChatDots />
              채팅방
            </p>
            <Button onClick={toggleCloseChatRoom}>X</Button>
          </ChatBar>

          <ChatText style={{ backgroundColor: backgroundColor, color: color }}>
            {/* chatMessages 배열을 순회 */}
            {chatMessages.map((message, index) => (
              <div key={index}>
                {/* 각 메시지(시간:메세지 내용)를 화면에 표시하는 컴포넌트를 생성 */}
                아이디:<strong>{message.text}</strong>
                {message.timestamp.toLocaleTimeString()}
              </div>
            ))}
            대화 기록
          </ChatText>

          <ChatInputContainer style={{ backgroundColor: backgroundColor }}>
            <Button>+</Button>
            <ChatInput
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder='Type your message...'
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
