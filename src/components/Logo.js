import styled from 'styled-components';

export const StyledLogo = styled.h1`
  font-family: Inter;
  font-size: 60px;
  font-weight: 700;
  // line-height: 50px; // 주석 변경
  // padding-top: 50px;  // 주석 변경
  margin-top: 30px; // 추가
  margin-bottom: 0px; // 추가
  letter-spacing: 0em;
  text-align: center;
  color: #183258;
`;

export const RedLetter = styled.span`
  color: #e20000;
`;

const Logo = () => {
  return (
    <StyledLogo>
      IDE<RedLetter>A</RedLetter>
    </StyledLogo>
  );
};

export default Logo;
