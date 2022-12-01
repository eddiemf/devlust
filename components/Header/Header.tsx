import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import styles from './Header.module.scss';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link href="/" title="DevLust">
					<Logo width={200} />
				</Link>

				<nav className={styles.nav}>{/* <Link to="/info">Info</Link> */}</nav>
			</div>
		</header>
	);
};
