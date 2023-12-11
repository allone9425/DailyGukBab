import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import finder from '../assets/finder.svg';
// import useMarkerFromFirebase from '../hooks/useMarkerFromFirebase';
import useMarkerFromFirebase from '../hooks/useMarkerFromFirebase';
import { setIsFiltered } from '../redux/modules/filterSlice';
import { setSearchAddress } from '../redux/modules/searchSlice';

function SearchBar() {
  const { kakao } = window;
  const dispatch = useDispatch();
  const { searchAddress } = useSelector((state) => state.search);
  const { isFiltered } = useSelector((state) => state.filter);
  // const { refetch } = useMarkerFromKaKao({ kakao, searchAddress });
  const [searchText, setSearchText] = useState('');
  const { refetch } = useMarkerFromFirebase(searchAddress);

  const onSearchAddressChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  const onSearchBtnClickHandler = (e) => {
    e.preventDefault();
    dispatch(setIsFiltered(false));
    dispatch(setSearchAddress(searchText));
    refetch({ queryKey: ['firebase/places', searchAddress] });
    // refetch({ queryKey: ['kakao/places', { kakao, searchAddress }] });
  };

  return (
    <StSearchBarContainer>
      <form onSubmit={onSearchBtnClickHandler}>
        <label htmlFor="searchText"></label>
        <input
          type="text"
          id="searchText"
          value={searchText}
          onChange={onSearchAddressChangeHandler}
          placeholder="오늘은 뭘 먹어볼까요?"
        ></input>
        <button>
          <img src={finder} alt="search" />
        </button>
      </form>
    </StSearchBarContainer>
  );
}

export default SearchBar;

const StSearchBarContainer = styled.div`
  position: absolute;
  width: 270px;
  z-index: 2;
  top: 80px;
  left: calc(300px - 135px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0px;

  input {
    padding: 8px;
    font-size: 20px;
    border: none;
    padding: 15px 25px;
    margin-right: 10px;
    border-radius: 30px;
    outline: none;
    box-shadow: 0px 4px 4px #0003;
    &::placeholder {
      color: #ccc;
    }
  }

  button {
    border: none;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 3px;
    img {
      width: 30px;
    }
  }
`;
