import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
// import { StyledLogo, RedLetter } from '../../components/Logo';

const Join = () => {
  return (
    <>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Logo />
      </Link>
      {/* <StyledLogo>
        IDE<RedLetter>A</RedLetter>
      </StyledLogo> */}
      <span>Create Account</span>
    </>
  );
};

export default Join;
