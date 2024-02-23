import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	useServerSideInitialPropsFetcher,
	InitialPropsInterface,
} from '@nx-next-app/hooks'
import { BankInfoProvider } from '@nx-next-app/features/F0006/providers'
import { Layout, BankInfo } from '@nx-next-app/features/F0006/h5'
import { find } from 'lodash-es'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'

interface IBankInfoPageProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const BankInfoPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IBankInfoPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<BankInfoProvider withdrawalBlockSetting={withdrawalBlockSetting}>
					<Layout persistSEOData={persistSEOData}>
						<BankInfo />
					</Layout>
				</BankInfoProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export default BankInfoPage

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	// 因為手機版要提前在 serverside 做導轉，故將此 api fetching 直接拉到 serverSide 處理
	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	const localCardAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.BankCard
	)?.status

	// 預設 localCard 不應該關閉，若關閉先導至 wallet 防呆
	if (!localCardAllowed) {
		return {
			redirect: {
				destination: paths.wallet.root,
				permanent: false,
			},
		}
	}

	return {
		props: {
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}
