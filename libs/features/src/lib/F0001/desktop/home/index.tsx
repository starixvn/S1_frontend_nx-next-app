import React from 'react'
import { useTranslation } from 'next-i18next'

// * wip feat
const Home = () => {
	const { t } = useTranslation()

	return (
		<>
			<h1>{t('Label_Title')}</h1>
			<main>
				<p>Home Page</p>
			</main>
		</>
	)
}

export default Home
