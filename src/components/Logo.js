import styled from 'styled-components';

export const StyledLogo = styled.p`
  font-family: Inter;
  font-size: 60px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 0px;
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
