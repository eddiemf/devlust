import React from 'react';
import styled from 'styled-components';
import { PostData } from '../../utils/PostParser';
import Container from '../container';
import PostCard from '../postCard';

interface PostListProps {
  posts: PostData[];
}

const PostList = ({ posts }: PostListProps) => {
  const hasPosts = !!posts.length;
  return (
    <Container>
      {hasPosts && (
        <StyledPostList>
          {posts.map(({ date, slug, excerpt, title }) => (
            <PostCard
              key={slug}
              date={date}
              slug={slug}
              title={title}
              excerpt={excerpt}
            />
          ))}
        </StyledPostList>
      )}

      {!hasPosts && <p>There are no posts yet :(</p>}
    </Container>
  );
};

export default PostList;

const StyledPostList = styled.ul`
  display: grid;
  grid-row-gap: 60px;
`;
