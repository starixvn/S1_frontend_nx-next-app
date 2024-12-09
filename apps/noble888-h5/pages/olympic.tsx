import { NovaAuthProvider } from '@noble888-h5/providers'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, Olympic } from '@nx-next-app/features/F0001/h5'
import { OlympicProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/noble888'
import { includes } from 'lodash'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type IEuroCupProps = InitialPropsInterface

const OlympicPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IEuroCupProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<OlympicProvider>
						<Olympic />
					</OlympicProvider>
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	const { originCookies } = initialProps

	const currencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	if (!includes(ALLOWED_CURRENCIES['OLYMPIC'], Number(currencyId))) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default OlympicPage
