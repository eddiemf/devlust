import React from 'react';
import Link from 'next/link';
import styles from './PostCard.module.scss';

interface IProps {
	title: string;
	date: string;
	slug: string;
	excerpt: string;
}

export const PostCard = ({ title, date, slug, excerpt }: IProps) => {
	return (
		<article className={styles.post}>
			<Link className={styles.link} href={`/${slug}`} title={title}>
				<header className={styles.header}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>{title}</h1>
						<p className={styles.date}>{date}</p>
					</div>
				</header>

				<div className={styles.descriptionContainer}>
					<p>{excerpt}</p>
				</div>
			</Link>
		</article>
	);
};
