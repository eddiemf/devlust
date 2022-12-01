import React from 'react';
import { IPostData } from '../../interfaces/Post';
import { Container } from '../Layout/Container';
import { PostCard } from '../PostCard';
import styles from './PostList.module.scss';

interface IProps {
	posts: IPostData[];
}

export const PostList = ({ posts }: IProps) => {
	if (!posts.length)
		return (
			<Container>
				<p>There are no posts yet :(</p>
			</Container>
		);

	return (
		<Container>
			<ul className={styles.postList}>
				{posts.map(({ date, slug, excerpt, title }) => (
					<li key={slug}>
						<PostCard date={date} slug={slug} title={title} excerpt={excerpt} />
					</li>
				))}
			</ul>
		</Container>
	);
};
