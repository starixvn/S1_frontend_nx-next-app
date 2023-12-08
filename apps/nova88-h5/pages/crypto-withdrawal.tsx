import { GetServerSideProps } from 'next'
import { find } from 'lodash-es'
import { paths } from '@nx-next-app/constants'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	AuthProvider,
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, CryptoWithdrawal } from '@nx-next-app/features/F0001/h5'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	CryptoWalletProvider,
	WithdrawalProvider,
} from '@nx-next-app/features/F0001/providers'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'

interface ICryptoWithdrawalProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const CryptoWithdrawalPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
}: ICryptoWithdrawalProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<WithdrawalProvider withdrawalBlockSetting={withdrawalBlockSetting}>
						<CryptoWalletProvider>
							<CryptoWithdrawal />
						</CryptoWalletProvider>
					</WithdrawalProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

	// 因為手機版要提前在 serverside 做導轉，故將此 api fetching 直接拉到 serverSide 處理
	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	const withdrawalAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.Crypto
	)?.status

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

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

export default CryptoWithdrawalPage
