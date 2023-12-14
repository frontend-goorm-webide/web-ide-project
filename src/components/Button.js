import styled from 'styled-components';

const StyledButton = styled.button`
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

// 함수 컴포넌트에서 스타일링된 버튼 사용
const Button = ({ onClick, type, children }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
