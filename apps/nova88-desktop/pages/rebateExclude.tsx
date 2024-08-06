import { NovaAuthProvider } from '@nova88-desktop/providers'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { RebateExclude } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type IRebateExcludePageProps = InitialPropsInterface

// * rebateExclude 不需要 layout
const RebateExcludePage = ({
	originIsSignIn,
	originCookies,
	persistStaticFileDomainData,
}: IRebateExcludePageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<RebateExclude />
			</GlobalDataProvider>
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

export default RebateExcludePage
