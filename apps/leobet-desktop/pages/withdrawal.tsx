import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Withdrawal } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	CryptoWalletProvider,
	WithdrawalProvider,
} from '@nx-next-app/features/F0001/providers'
import { FOOTER_DATA } from '@nx-next-app/site/leobet'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

interface IWithdrawalPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const WithdrawalPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: IWithdrawalPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<WithdrawalProvider>
						{/* 因為需使用 cryptoWallet 的 hooks ,故需多包此層 */}
						<CryptoWalletProvider>
							<Withdrawal />
						</CryptoWalletProvider>
					</WithdrawalProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const langId = initialProps.originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(
		initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]
	)

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default WithdrawalPage
