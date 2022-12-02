import { config } from '../../config';
import { IPost, IPostData } from '../../interfaces/Post';
import { formatDate } from './formatDate';

interface IDependencies {
	postsDirectory: string;
	readDirectory: (directory: string) => string[];
	readFile: (fileName: string) => Buffer;
	getPostData: (file: Buffer) => Record<string, any>;
}

export const contentServiceFactory = ({
	postsDirectory,
	readDirectory,
	readFile,
	getPostData,
}: IDependencies) => {
	const api = {
		async getPosts(): Promise<IPostData[]> {
			const posts: IPostData[] = [];
			const postFoldersNames = readDirectory(postsDirectory);

			postFoldersNames.forEach((folderName) => {
				try {
					const postFile = readFile(`${postsDirectory}/${folderName}/index.md`);
					const postData = getPostData(postFile);
					posts.push({ ...(postData as IPostData) });
				} catch (error) {
					console.log(error);
				}
			});

			return posts
				.filter((post) => !post.isDraft)
				.sort(byMostRecent)
				.map((post) => ({ ...post, date: formatDate(post.date) }));
		},

		async findPost(slug: string): Promise<IPost | null> {
			try {
				const postFile = readFile(`${postsDirectory}/${slug}/index.md`);
				const postData = getPostData(postFile);

				if (postData.isDraft) return null;

				return {
					title: postData.title,
					date: formatDate(postData.date),
					slug: postData.slug,
					excerpt: postData.excerpt,
					content: postData.content,
					editUrl: `${config.githubPostsUrl}/${postData.slug}/index.md`,
					isDraft: postData.isDraft,
				};
			} catch (error) {
				console.log(error);
				return null;
			}
		},
	};

	const extractYear = (date: string) => +date.split('-')[0];
	const extractMonth = (date: string) => +date.split('-')[1];
	const extractDay = (date: string) => +date.split('-')[2];

	const byMostRecent = (postA: IPostData, postB: IPostData) => {
		const unixDateA = new Date(
			extractYear(postA.date),
			extractMonth(postA.date),
			extractDay(postA.date)
		).getTime();

		const unixDateB = new Date(
			extractYear(postB.date),
			extractMonth(postB.date),
			extractDay(postB.date)
		).getTime();

		return unixDateA < unixDateB ? 1 : -1;
	};

	return api;
};
