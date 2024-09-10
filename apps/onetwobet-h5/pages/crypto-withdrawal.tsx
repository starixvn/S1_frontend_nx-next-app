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
import {
	CryptoWalletProvider,
	WithdrawalProvider,
} from '@nx-next-app/operations'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { find } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '../components'
import CryptoWithdrawal from '../components/withdrawal/cryptoWithdrawal'

interface ICryptoWithdrawalProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const CryptoWithdrawalPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
	withdrawalBlockSetting,
}: ICryptoWithdrawalProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<WithdrawalProvider withdrawalBlockSetting={withdrawalBlockSetting}>
						<CryptoWalletProvider
							withdrawalBlockSetting={withdrawalBlockSetting}
						>
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
		({ type }) => type === IWithdrawalTypeEnum.Crypto
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

export default CryptoWithdrawalPage
