import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	getCustomLotteryDataForClient,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, LotteryEventPage } from '@nx-next-app/features/F0001/desktop'
import {
	ILotteryData,
	LotteryDataProvider,
} from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { FOOTER_DATA } from '@nx-next-app/site/noble888'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ILotteryPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	lotteryData: ILotteryData
}

const LotteryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	lotteryData,
}: ILotteryPageProps) => (
	<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
		<GlobalDataProvider
			persistStaticFileDomainData={persistStaticFileDomainData}
		>
			<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
				<LotteryDataProvider data={lotteryData}>
					<LotteryEventPage />
				</LotteryDataProvider>
			</Layout>
		</GlobalDataProvider>
	</AuthProvider>
)

export const getServerSideProps: GetServerSideProps<
	ILotteryPageProps
> = async context => {
	try {
		const initialProps = await useServerSideInitialPropsFetcher(context)
		const { originCookies, currentHeaderCookies, originIsSignIn } = initialProps

		if (!originIsSignIn) throw Error('Not logged in')

		const { langId, currencyId } = {
			langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
			currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
		}

		const lotteryData = await getCustomLotteryDataForClient({
			headers: { cookie: currentHeaderCookies },
		})

		return {
			props: {
				persistFooterData: FOOTER_DATA({ langId, currencyId }),
				...initialProps,
				...(await serverSideTranslations(context.locale)),
				lotteryData,
			},
		}
	} catch {
		return { redirect: { destination: '/', permanent: false } }
	}
}

export default LotteryPage
