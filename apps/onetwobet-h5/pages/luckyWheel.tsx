import { ENV_COOKIE_NAMES, EVENT_PERIOD } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, LuckyWheel } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { LuckWheelProvider } from '@nx-next-app/operations'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/onetwobet'
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
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<LuckWheelProvider>
						<LuckyWheel eventPeriod={EVENT_PERIOD.LUCKY_WHEEL} />
					</LuckWheelProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
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
