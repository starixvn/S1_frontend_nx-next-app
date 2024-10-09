import { BankInfo, Layout } from '@12b-h5/components/index'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { BankInfoProvider } from '@nx-next-app/operations'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { find } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IBankInfoPageProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const BankInfoPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IBankInfoPageProps) => {
	const { modal } = useGlobalModal()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<BankInfoProvider
					withdrawalBlockSetting={withdrawalBlockSetting}
					errorCallback={errorMessage => modal.error(errorMessage)}
				>
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
