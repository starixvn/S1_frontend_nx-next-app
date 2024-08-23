import {
	AuthProvider,
	getCustomLotteryDataForClient,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, LotteryEvent } from '@nx-next-app/features/F0001/h5'
import {
	ILotteryData,
	LotteryDataProvider,
	LotteryProgressProvider,
} from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ILotteryPageProps extends InitialPropsInterface {
	lotteryData: ILotteryData
}

const LotteryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	lotteryData,
}: ILotteryPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<LotteryDataProvider data={lotteryData}>
						<LotteryProgressProvider>
							<LotteryEvent />
						</LotteryProgressProvider>
					</LotteryDataProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps<
	ILotteryPageProps
> = async context => {
	try {
		const initialProps = await useServerSideInitialPropsFetcher(context)
		const { currentHeaderCookies, originIsSignIn } = initialProps

		if (!originIsSignIn) throw Error('Not logged in')

		const lotteryData = await getCustomLotteryDataForClient({
			headers: { cookie: currentHeaderCookies },
		})

		return {
			props: {
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
