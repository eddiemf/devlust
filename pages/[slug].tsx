import { GetStaticPaths, GetStaticProps } from 'next';
import { Post } from '../components/Post';
import { SEO } from '../components/Seo';
import { IPost } from '../interfaces/Post';
import { contentService } from '../services';

interface IProps {
	post: IPost;
}

const PostPage = ({ post }: IProps) => {
	return (
		<>
			<SEO title={post.title} description={post.excerpt} />
			<Post {...post} />
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
	const post = await contentService.findPost(params.slug as string);
	if (!post) throw new Error(`Post ${params.slug} not found.`);

	return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await contentService.getPosts();
	const paths = posts.map((post) => ({ params: { slug: post.slug } }));

	return { paths, fallback: false };
};

export default PostPage;
