import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { CryptoWalletProvider } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/onetwobet-indo'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CryptoWallet, Layout, LeftMenu } from '../components'

interface ICryptoWalletPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const CryptoWalletPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	withdrawalBlockSetting,
}: ICryptoWalletPageProps) => {
	const { modal } = useGlobalModal()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<CryptoWalletProvider
					withdrawalBlockSetting={withdrawalBlockSetting}
					errorCallback={errorMessage => modal.error(errorMessage)}
				>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
					>
						<main>
							<section className='inside'>
								<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
								<CryptoWallet />
							</section>
						</main>
					</Layout>
				</CryptoWalletProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps
	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}

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

export default CryptoWalletPage
