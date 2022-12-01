import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Container } from '../Layout/Container';
import styles from './Post.module.scss';

interface IProps {
	title: string;
	date: string;
	editUrl: string;
	excerpt: string;
	content: string;
	slug: string;
}

export const Post = ({ content, date, excerpt, slug, title, editUrl }: IProps) => {
	return (
		<Container>
			<header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
				<div className={styles.meta}>
					<p className={styles.date}>{date}</p>
					<span className={styles.metaSeparator}>|</span>
					<a href={editUrl} target="_blank" rel="noopener noreferrer">
						Edit on Github
					</a>
				</div>
				<p className={styles.excerpt}>{excerpt}</p>
			</header>

			<div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />

			<a
				href={`https://twitter.com/search?q=siteMetaData${slug}&f=live`}
				target="_blank"
				rel="noopener noreferrer"
			>
				Discuss on Twitter
			</a>
		</Container>
	);
};
