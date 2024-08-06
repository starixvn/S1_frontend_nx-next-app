import { NovaAuthProvider } from '@nova88-desktop/providers'
import {
	InitialPropsInterface,
	useCheckLineDirect,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'

// * Line Callback
// * http://localhost:4001/callback?code=LPqM5A3VB5XYcthYHJP5&state=3d5c23b0-caae-4306-bab9-618833f0bfe0
const Callback = ({ originIsSignIn, originCookies }: InitialPropsInterface) => {
	const langId = originCookies[ENV_COOKIE_NAMES.LangId]

	useCheckLineDirect({ langId })

	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			LINE CALLBACK ...
		</NovaAuthProvider>
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
export default Callback
