import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel='preload'
					href='https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@300;400;600&family=Poppins:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@500;700&family=Be+Vietnam+Pro:wght@300;400;500&family=Noto+Sans+Display:wght@900&display=swap'
					as='style'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
