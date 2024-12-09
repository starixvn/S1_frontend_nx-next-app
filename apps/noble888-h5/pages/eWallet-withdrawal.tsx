import { NovaAuthProvider } from '@noble888-h5/providers'
import { paths } from '@nx-next-app/constants'
import {
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import { Layout, Withdrawal } from '@nx-next-app/features/F0001/h5'
import { WithdrawalProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { find } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IEWithdrawalProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const EWalletWithdrawalPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IEWithdrawalProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<WithdrawalProvider withdrawalBlockSetting={withdrawalBlockSetting}>
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
		({ type }) => type === IWithdrawalTypeEnum.EWallet
	)?.status

	// 沒開放就轉到 withdrawal
	if (!withdrawalAllowed) {
		return {
			redirect: {
				destination: paths.withdrawal.root,
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

export default EWalletWithdrawalPage
