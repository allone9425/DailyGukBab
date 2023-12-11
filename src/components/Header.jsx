import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
function Header() {
  const navigate = useNavigate();
  const onLogoClickHandler = () => {
    navigate('/');
  };
  return (
    <StHeader>
      <div onClick={onLogoClickHandler}>
        <img src={logo} />
        <p>
          데일리<span>국밥</span>
        </p>
      </div>
    </StHeader>
  );
}

export default Header;

const StHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dbc8b6;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  span {
    color: #de754c;
  }
  p {
    background-color: transparent;
    font-size: 30px;
    color: #866761;
    /* font-weight: 900; */
    font-variation-settings: 'wght' 900;
    user-select: none;
    border: none;
    margin-left: 6px;
  }
  img {
    height: 40px;
  }
`;
