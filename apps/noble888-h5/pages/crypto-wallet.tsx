import { NovaAuthProvider } from '@noble888-h5/providers'
import { paths } from '@nx-next-app/constants'
import {
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { CryptoWallet, Layout } from '@nx-next-app/features/F0001/h5'
import { CryptoWalletProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { find } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ICryptoWalletProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const CryptoWalletPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: ICryptoWalletProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<CryptoWalletProvider withdrawalBlockSetting={withdrawalBlockSetting}>
					<Layout persistSEOData={persistSEOData}>
						<CryptoWallet />
					</Layout>
				</CryptoWalletProvider>
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

	const cryptoCardAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.Crypto
	)?.status

	// crypto 卡片關閉就導到 bankCard
	if (!cryptoCardAllowed) {
		return {
			redirect: {
				destination: paths.bankInfo.root,
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

export default CryptoWalletPage
