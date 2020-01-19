import React from 'react';
import styled from 'styled-components';

import PostListItem from '../postListItem';
import Container from '../container';

interface PostListProps {
  posts: [Post];
}

const PostList = ({ posts }: PostListProps) => {
  const hasPosts = !!posts.length;
  return (
    <Container>
      {hasPosts && (
        <StyledPostList>
          {posts.map(({ date, slug, excerpt, thumbnail, title }) => (
            <PostListItem
              key={slug}
              date={date}
              slug={slug}
              thumbnail={thumbnail}
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
