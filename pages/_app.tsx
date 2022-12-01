import React from 'react';
import { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import '../components/Layout/Global.scss';
import { SEO } from '../components/Seo';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<SEO />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
