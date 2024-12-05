import { PredictionChallenge } from '@apps/noble888-desktop/components/index'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { PredictionChallengeProvider } from '@nx-next-app/operations'
import { ALLOWED_CURRENCIES, FOOTER_DATA } from '@nx-next-app/site/nova88'
import { IFooterData } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IPredictionChallengePageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const PredictionChallengePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
}: IPredictionChallengePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<PredictionChallengeProvider>
						<PredictionChallenge />
					</PredictionChallengeProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies } = initialProps

	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}

	if (!includes(ALLOWED_CURRENCIES['PREDICTION_CHALLENGE'], currencyId)) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default PredictionChallengePage
