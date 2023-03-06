import { GetServerSideProps } from 'next'
import { authApiUrl, baseAxios } from '@nx-next-app/api'
import { useAuth } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const Index = (data: unknown) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isSignIn } = useAuth()

	const { t } = useTranslation()

	return (
		<>
			<Head>
				<title>Nova88 | Nova88 Slot | Nova88 Casino | Nova88 Bet</title>
				<meta
					name='description'
					content='Nova88 is Most Trusted Sportsbook, Live Casino and Slot Games in Asia. Officially Licensed and Subsidiary of SABA Sports.'
					key='Asia Most Trusted Sportsbook, Live Casino, Slot Games, SABA Sports, Online Casino, Online Betting'
				/>
			</Head>
			<div>{t('Label_Title')}</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { data } = await baseAxios.post(authApiUrl.checkSignIn)

	return {
		props: {
			data,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default Index
