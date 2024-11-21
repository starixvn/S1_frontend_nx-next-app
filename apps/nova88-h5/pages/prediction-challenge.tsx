import { PredictionChallenge } from '@n88-h5/components/index'
import { NovaAuthProvider } from '@nova88-h5/providers'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { PredictionChallengeProvider } from '@nx-next-app/operations'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { includes } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type IPredictionChallengePageProps = InitialPropsInterface

const PredictionChallengePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IPredictionChallengePageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<PredictionChallengeProvider>
						<PredictionChallenge />
					</PredictionChallengeProvider>
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

	if (
		!includes(ALLOWED_CURRENCIES['PREDICTION_CHALLENGE'], Number(currencyId))
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

export default PredictionChallengePage
