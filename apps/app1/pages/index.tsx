import { GetServerSideProps } from 'next'
import { authApiUrl, baseAxios } from '@nx-next-app/service'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index = () => {
	return <div>Home</div>
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
