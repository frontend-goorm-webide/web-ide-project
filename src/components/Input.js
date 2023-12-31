import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 18rem;
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
  padding-left: 5px;
  border-radius: 7px;
  background-color: #d3d3d3;
  border: transparent;

  &:focus {
    background-color: #ffffff;
  }
`;

const Input = ({ label, type, placeholder, value, onChange, onClick }) => {
  return (
    <div>
      <label>
        {label}
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
        />
      </label>
    </div>
  );
};

export default Input;
