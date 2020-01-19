import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { brandColor } from '../../theme/colors';
import DateFormatter from './DateFormatter';

interface PostListItemProps {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  thumbnail: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

const PostListItem = ({ title, date, slug, excerpt }: PostListItemProps) => {
  const dateFormatter = new DateFormatter({ date });
  return (
    <li>
      <PostArticle>
        <PostHeader>
          <TitleContainer>
            <PostTitle>
              <PostTitleLink to={`/${slug}`} title={title}>
                {title}
              </PostTitleLink>
            </PostTitle>

            <PostDate>{dateFormatter.format()}</PostDate>
          </TitleContainer>
        </PostHeader>

        <DescriptionContainer>
          <p>{excerpt}</p>
        </DescriptionContainer>
      </PostArticle>
    </li>
  );
};

export default PostListItem;

const boxShadow = `box-shadow: 0px 2px 4px 2px rgba(46, 41, 51, 0.06), 0px 2px 4px rgba(71, 63, 79, 0.08);`;
const strongBoxShadow = `box-shadow: 0px 2px 4px 2px rgba(106, 49, 150, .4), 0px 2px 4px rgba(106, 49, 150, 0.4);`;

const PostArticle = styled.article`
  padding: 15px;
  border-radius: 2px;
  transition: all 200ms;
  ${boxShadow}

  &:hover {
    ${strongBoxShadow}
  }
`;

const PostHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;

  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const PostTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 1.2;

  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
`;

const PostTitleLink = styled(Link)`
  color: #333;

  &:hover {
    color: ${brandColor};
  }
`;

const PostDate = styled.p`
  margin: 0;
  font-size: 16px;
  font-style: italic;
`;

const DescriptionContainer = styled.div`
  p {
    line-height: 1.6;
    font-weight: 300;
  }
`;
