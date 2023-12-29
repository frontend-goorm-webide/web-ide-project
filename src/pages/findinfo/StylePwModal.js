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
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export const CenteredModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: center;
  padding: 0.3rem 1rem;
`;
