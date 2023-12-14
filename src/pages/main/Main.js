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
      <Button
        onClick={() =>
          openModal({
            title: 'findInfo 이동',
            contents: '이건 연습용 버튼입니다 :)',
            btnName: 'findInfo',
            redirectTo: '/findinfo', // findinfo 페이지 이동
          })
        }
      >
        findInfo
      </Button>
      <Button
        onClick={() =>
          openModal({
            title: 'ide 이동',
            contents: '새로운 비밀번호를 설정하세요:)',
            btnName: 'ide',
            redirectTo: '/ide', // ide 페이지 이동
          })
        }
      >
        ide
      </Button>
      {/* isModalOpen 이 true 인 경우에만 && 뒤 실행
      CommonModal 컴포넌트 랜더링, { }는 내용 전달, closeModal에 닫기 함수 전달 */}
      {isModalOpen && <CommonModal {...modalContent} closeModal={closeModal} />}
    </div>
  );
}

export default Main;
