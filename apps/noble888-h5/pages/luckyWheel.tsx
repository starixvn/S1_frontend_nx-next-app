import { NovaAuthProvider } from '@noble888-h5/providers'
import { ENV_COOKIE_NAMES, EVENT_PERIOD } from '@nx-next-app/constants'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, LuckyWheel } from '@nx-next-app/features/F0001/h5'
import { LuckWheelProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { includes } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ILuckyWheelPageProps = InitialPropsInterface

const LuckyWheelPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: ILuckyWheelPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<LuckWheelProvider>
						<LuckyWheel eventPeriod={EVENT_PERIOD.LUCKY_WHEEL} />
					</LuckWheelProvider>
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

	if (!includes(ALLOWED_CURRENCIES['LUCKY_WHEEL'], Number(currencyId))) {
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

export default LuckyWheelPage
