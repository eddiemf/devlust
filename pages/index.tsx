import type { GetStaticProps } from 'next';
import { PostList } from '../components/PostList';
import { IPostData } from '../interfaces/Post';
import { contentService } from '../services';

interface IProps {
	posts: IPostData[];
}

const HomePage = ({ posts }: IProps) => {
	return <PostList posts={posts} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const posts = await contentService.getPosts();

	return { props: { posts } };
};

export default HomePage;
