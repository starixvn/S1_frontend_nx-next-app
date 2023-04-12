import { GetServerSideProps } from 'next'
import { authApiUrl, baseAxios } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Nova88 } from '@nx-next-app/features'

const { Home } = Nova88.Desktop

const Index = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isSignIn } = useAuth()

	return <Home />
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
