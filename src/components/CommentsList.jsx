import React from 'react';
import styled from 'styled-components';
import useComments from '../hooks/useComments';
import Comment from './Comment';

function CommentsList({ currentMarker }) {
  const { data: comments, isLoading, isError, error } = useComments(currentMarker.id);
  console.log(comments);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }

  return (
    <StCommentsListWrapper>
      <ul>
        {comments
          ?.sort((a, b) => b.createdAt - a.createdAt)
          .map((comment) => (
            <li key={comment.commentId}>
              <Comment comment={comment} />
            </li>
          ))}
      </ul>
    </StCommentsListWrapper>
  );
}

export default CommentsList;

const StCommentsListWrapper = styled.section`
  margin: 0 auto;
  padding-bottom: 72px;
  width: 900px;
  background-color: #eee;
`;
