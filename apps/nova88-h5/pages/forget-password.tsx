import { GetServerSideProps } from 'next'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { ForgetPassword, Layout } from '@nx-next-app/features/F0001/h5'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type IForgetPasswordPageProps = InitialPropsInterface

const ForgetPasswordPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IForgetPasswordPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<ForgetPassword />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default ForgetPasswordPage
