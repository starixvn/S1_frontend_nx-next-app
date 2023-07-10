import React from 'react'
import { useTranslation } from 'next-i18next'
import { useMenu } from '@nx-next-app/hooks'

// * wip feat
const Home = () => {
	const { t } = useTranslation()

	return (
		<>
			<h1>{t('Label_General_Title')}</h1>
			<main>
				<p>Home Page</p>
			</main>
		</>
	)
}

export default Home
