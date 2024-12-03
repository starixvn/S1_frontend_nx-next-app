import { NovaAuthProvider } from '@noble888-desktop/providers'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, Withdrawal } from '@nx-next-app/features/F0001/desktop'
import {
	CryptoWalletProvider,
	WithdrawalProvider,
} from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IWithdrawalPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const WithdrawalPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
}: IWithdrawalPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<WithdrawalProvider withdrawalBlockSetting={withdrawalBlockSetting}>
						{/* 因為需使用 cryptoWallet 的 hooks ,故需多包此層 */}
						<CryptoWalletProvider
							withdrawalBlockSetting={withdrawalBlockSetting}
						>
							<Withdrawal withdrawalBlockSetting={withdrawalBlockSetting} />
						</CryptoWalletProvider>
					</WithdrawalProvider>
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps
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

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	return {
		props: {
			withdrawalBlockSetting,
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default WithdrawalPage
