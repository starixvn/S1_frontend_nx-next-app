import { NovaAuthProvider } from '@nova88-h5/providers'
import { ENV_COOKIE_NAMES, EVENT_PERIOD } from '@nx-next-app/constants'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, NewYearEvent } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { isEventPeriod } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type INewYearEventPageProps = InitialPropsInterface

const NewYearEventPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: INewYearEventPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<NewYearEvent />
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

	if (
		!includes(ALLOWED_CURRENCIES['NewYearEvent'], Number(currencyId)) ||
		!isEventPeriod(EVENT_PERIOD.NEW_YEAR_EVENT)
	) {
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

export default NewYearEventPage
