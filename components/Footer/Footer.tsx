import React from 'react';
import { Container } from '../Layout/Container';
import styles from './Footer.module.scss';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<span>Built with </span>
				<a className={styles.link} href="https://nextjs.org/" target="_blank" rel="noreferrer">
					Next.js
				</a>
				<span> ❤️</span>
			</Container>
		</footer>
	);
};
