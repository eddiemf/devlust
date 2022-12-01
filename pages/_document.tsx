import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="icon" href="/favicon.png" />
				<link
					href="https://fonts.googleapis.com/css?family=Lato:400,900|Montserrat:400,400i,700&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="google-site-verification"
					content="1wVJrKenhOKmDFZ3vWbY4OXkF2C2A74ak4N0gUo4Bf8"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				<script async src="prism.js"></script>
			</body>
		</Html>
	);
}
