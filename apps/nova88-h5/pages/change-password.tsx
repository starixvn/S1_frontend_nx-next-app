import { NovaAuthProvider } from '@nova88-h5/providers'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { ChangePassword, Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ChangePasswordPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: InitialPropsInterface) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<ChangePassword />
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export default ChangePasswordPage

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	// 當前已將 change-password 功能，改至 setting 頁，故將此頁等回首頁
	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}
