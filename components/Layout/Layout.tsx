import React from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.scss';

interface IProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.content}>{children}</div>
			<Footer />
		</div>
	);
};
