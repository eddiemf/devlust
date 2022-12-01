import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { contentServiceFactory } from './ContentService';
import showdown from 'showdown';

const converter = new showdown.Converter();
converter.setFlavor('github');

export const contentService = contentServiceFactory({
	postsDirectory: join(process.cwd(), 'posts'),
	readDirectory: (directory: string) => fs.readdirSync(directory),
	readFile: (fileName: string) => fs.readFileSync(fileName),
	getPostData: (markdown: Buffer) => {
		const result = matter(markdown);
		return { ...result.data, content: converter.makeHtml(result.content) };
	},
});
