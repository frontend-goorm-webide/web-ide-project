import styled from 'styled-components';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// 모달의 헤더, 본문, 푸터를 가운데 정렬하는 스타일
export const CenteredModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

export const CenteredModalBody = styled(ModalBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`;

export const CenteredModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: center;
  padding: 0.3rem 1rem;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-items: center;
`;

export const Button = styled.button`
  width: 110px;
  height: 40px;
  background-color: #36599d;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  }
  margin-top: 10px;
`;
