import React, { useState } from 'react';
import Button from '../../components/Button';
import CommonModal from '../../components/Modal';

function Main() {
  // 모달 열고 닫기 -> false 초기화
  const [isModalOpen, setModalOpen] = useState(false);
  // 모달 내용 -> 빈내용 초기화
  const [modalContent, setModalContent] = useState({});

  // 모달 열기 함수
  const openModal = (content) => {
    setModalOpen(true); // isModalOpen = true
    setModalContent(content); // 모달 내용 전달
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false); // isModalOpen = false
    setModalContent({}); // 모달 내용 공백 전달
  };

  return (
    <div>
      Main
      {/* 아이디찾기 버튼 */}
      <Button
        onClick={() =>
          openModal({
            title: '아이디 찾기',
            contents: '해당 아이디로 다시 로그인 해주세요:)',
            btnName: '로그인하기',
            redirectTo: '/', // main 페이지 이동
          })
        }
      >
        아이디 찾기
      </Button>
      {/* 비밀번호찾기 버튼 */}
      <Button
        onClick={() =>
          openModal({
            title: '비밀번호 찾기',
            contents: '새로운 비밀번호를 설정하세요:)',
            btnName: '확인',
            redirectTo: '/ide', // ide 페이지 이동
          })
        }
      >
        비밀번호 찾기
      </Button>
      {/* isModalOpen 이 true 인 경우에만 && 뒤 실행
      CommonModal 컴포넌트 랜더링, { }는 내용 전달, closeModal에 닫기 함수 전달 */}
      {isModalOpen && <CommonModal {...modalContent} closeModal={closeModal} />}
    </div>
  );
}

export default Main;
