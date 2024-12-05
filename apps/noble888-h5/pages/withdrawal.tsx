import { Layout, Withdrawal } from '@apps/noble888-h5/components/index'
import { NovaAuthProvider } from '@noble888-h5/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { WithdrawalProvider } from '@nx-next-app/operations'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { find } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IWithdrawalProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}
const WithdrawalPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IWithdrawalProps) => {
	const { modal } = useGlobalModal()
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<WithdrawalProvider
						withdrawalBlockSetting={withdrawalBlockSetting}
						errorCallback={errorMessage => modal.error(errorMessage)}
					>
						<Withdrawal />
					</WithdrawalProvider>
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

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

	const withdrawalAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.BankCard
	)?.status

	const eWithdrawalAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.EWallet
	)?.status

	const cryptoWithdrawalAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.Crypto
	)?.status

	// 沒開放就轉到 withdrawal history
	if (!withdrawalAllowed) {
		if (eWithdrawalAllowed) {
			return {
				redirect: {
					destination: paths.eWalletWithdrawal.root,
					permanent: false,
				},
			}
		}
		if (cryptoWithdrawalAllowed) {
			return {
				redirect: {
					destination: paths.cryptoWithdrawal.root,
					permanent: false,
				},
			}
		}
		return {
			redirect: {
				destination: paths.withdrawalHistory.root,
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

export default WithdrawalPage
