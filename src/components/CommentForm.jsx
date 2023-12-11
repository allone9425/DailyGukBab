import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { addComment } from '../api/comments';

function CommentForm({ currentMarker }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('firebase/comments');
      console.log('성공');
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const [nickname, setNickname] = useState('익명의 국밥러');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');

  const onNicknameChangeHandler = (e) => {
    setNickname(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const onSubmitBtnClickHandler = (e) => {
    e.preventDefault();

    const newComment = {
      nickname,
      password,
      content,
      createdAt: dayjs().toJSON(),
      postId: currentMarker.id
    };
    console.log(newComment);
    mutation.mutate(newComment);

    setNickname('익명의 국밥러');
    setPassword('');
    setContent('');
  };

  return (
    <StFormWrapper>
      <StForm action="">
        <StWriterInfo>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input value={nickname} id="nickname" type="text" onChange={onNicknameChangeHandler} />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              value={password}
              id="password"
              type="password"
              placeholder="비밀번호는 4자리 이상이어야 합니다."
              onChange={onPasswordChangeHandler}
            />
          </div>
        </StWriterInfo>
        <StTextareaWrapper>
          <label htmlFor="contents">내용</label>
          <textarea
            value={content}
            id="contents"
            placeholder="200자 이내의 내용을 입력해주세요"
            maxLength={200}
            rows={2}
            onChange={onContentChangeHandler}
          />
        </StTextareaWrapper>
      </StForm>
      <button onClick={onSubmitBtnClickHandler}>댓글 등록하기</button>
    </StFormWrapper>
  );
}

export default CommentForm;

const StFormWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  padding: 12px;
  box-sizing: border-box;
  background-color: #dbc8b6;

  border-radius: 18px;

  button {
    display: block;
    margin: 0 auto;
    padding: 12px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #de754c;
    &:hover {
      background-color: #eee;
      color: #333;
    }
  }
`;
const StForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
`;

const StWriterInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    width: 100%;
    padding: 12px;
    background-color: #eee5dd;
  }
  label {
    font-size: 1rem;
  }
  input {
    width: 300px;
    padding: 10px;
    outline: none;
    font-size: 1rem;
    border-radius: 5px;
    font-family: inherit;
    border: none;
    &::placeholder {
      color: #ccc;
    }
  }
`;

const StTextareaWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #eee5dd;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    font-size: 0.8rem;
    display: block;
    padding-bottom: 12px;
    font-size: 1rem;
  }
  textarea {
    box-sizing: border-box;
    width: 91%;
    resize: none;
    font-size: 1rem;
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    font-family: inherit;
    &::placeholder {
      color: #ccc;
    }
  }
`;
