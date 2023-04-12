import React from 'react'
import { authApiUrl, baseAxios } from '@nx-next-app/service'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Nova88 } from '@nx-next-app/features'

const { Home } = Nova88.Desktop

const Index = () => {
	return (
		<div>
			<Home />
		</div>
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
