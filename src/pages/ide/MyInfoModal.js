import styled from 'styled-components';

const ModalWrapper = styled.div`
  //스타일링
`;

const Button = styled.button`
  background-color: #546e7a;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background-color: #78909c;
  }
`;

const MyInfoModal = ({ onRequestClose }) => {
  return (
    <ModalWrapper>
      <p>프로필 사진, 아이디, 이메일 정보</p>
      <Button onClick={onRequestClose}>닫기</Button>
    </ModalWrapper>
  );
};

export default MyInfoModal;