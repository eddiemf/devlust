export interface IPostData {
	title: string;
	date: string;
	slug: string;
	excerpt: string;
	isDraft: boolean;
}

export interface IPost extends IPostData {
	content: string;
	editUrl: string;
}
