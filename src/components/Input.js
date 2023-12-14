import styled from 'styled-components';

const Input = styled.input`
  width: 13rem;
  height: 2.7rem;
  top: 378px;
  left: 776px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  box-sizing: border-box;
  text-align: left;
  padding-left: 10px;
  border-radius: 7px;
  background-color: #d3d3d3;
  border: transparent;

  &:focus {
    background-color: #ffffff;
  }
`;

export default Input;
