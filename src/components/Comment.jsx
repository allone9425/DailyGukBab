import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { deleteComment, updateComment } from '../api/comments';

function Comment({ comment }) {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateValue, setUpdateValue] = useState(comment.content);

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('firebase/comments');
      console.log('성공');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const updateMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('firebase/comments');
      console.log('성공');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const onEditModeBtnClickHandler = () => {
    setIsEditMode(true);
  };

  const onEditBtnClickHandler = () => {
    if (window.confirm('정말 수정하시겠습니까?')) {
      const data = {
        updateContent: { content: updateValue, editedAt: dayjs().format('YYYY년 MM월 DD일 hh:mm') },
        commentId: comment.commentId
      };

      updateMutation.mutate(data);
      setIsEditMode(false);
    }
  };

  const onDeleteBtnClickHandler = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(comment.commentId);
    }
  };

  const onCancelEditBtnClickHandler = () => {
    setIsEditMode(false);
    setUpdateValue(comment.content);
  };

  const onEditContentChangeHandler = (e) => {
    setUpdateValue(e.target.value);
  };

  return (
    <StCommentContainer>
      <p>{dayjs(comment.createdAt).format('YYYY년 MM월 DD일 hh:mm')}</p>
      <StCommentContentContainer>
        <h3>{comment.nickname}</h3>
        {isEditMode ? (
          <textarea
            value={updateValue}
            id="contents"
            placeholder="200자 이내의 내용을 입력해주세요."
            maxLength={200}
            rows={2}
            onChange={onEditContentChangeHandler}
          />
        ) : (
          <p>{comment.content}</p>
        )}
      </StCommentContentContainer>
      {isEditMode ? (
        <StBtnContainer>
          <button onClick={onEditBtnClickHandler}>수정 완료</button>
          <button onClick={onCancelEditBtnClickHandler}>취소</button>
        </StBtnContainer>
      ) : (
        <StBtnContainer>
          <button onClick={onEditModeBtnClickHandler}>수정</button>
          <button onClick={onDeleteBtnClickHandler}>삭제</button>
        </StBtnContainer>
      )}
    </StCommentContainer>
  );
}

export default Comment;

const StCommentContainer = styled.div`
  width: 900px;
  box-shadow: 2px 2px 6px #aaa;
  border-radius: 8px;
  margin: 30px 0px;
  background-color: #fff;
  position: relative;
  p {
    //background-color: yellowgreen;
    padding: 30px 10px;
    width: 900px;
  }
  & > p {
    text-align: end;
    font-size: 0.8rem;
    box-sizing: border-box;
    padding: 10px 10px 0px 10px;
    position: absolute;
    right: 0;
    top: 2px;
  }
  button {
    background-color: #de754c;
    padding: 10px 15px;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin: 10px 10px;
    text-align: end;
    &:hover {
      background-color: #eee;
      color: #333;
    }
  }
`;

const StCommentContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;

  h3 {
    width: 100%;
    padding: 10px 10px;
    font-weight: bold;
    font-size: 1rem;
    background-color: #dbc8b6;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  textarea {
    width: 860px;
    flex-shrink: 1;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
    font-size: 1rem;
    border: 1px solid #ccc;
    resize: none;
    padding: 10px 10px;
    border-radius: 5px;
    margin: 10px;
  }
`;

const StBtnContainer = styled.div`
  //background-color: #ddd;
  display: flex;
  justify-content: flex-end;
`;
