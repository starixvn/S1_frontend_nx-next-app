import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { CryptoWalletProvider } from '@nx-next-app/features/F0006/providers'
import { Layout, CryptoWallet } from '@nx-next-app/features/F0006/h5'
import { find } from 'lodash-es'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'

interface ICryptoWalletProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const CryptoWalletPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
}: ICryptoWalletProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<CryptoWalletProvider withdrawalBlockSetting={withdrawalBlockSetting}>
					<Layout persistSEOData={persistSEOData}>
						<CryptoWallet />
					</Layout>
				</CryptoWalletProvider>
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
