import { NovaAuthProvider } from '@noble888-desktop/providers'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	getWithdrawalBlockSetting,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { BankInfo, Layout, LeftMenu } from '@nx-next-app/features/F0001/desktop'
import { BankInfoProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IBankInfoPage extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const BankInfoPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	withdrawalBlockSetting,
	persistFooterData,
	persistStaticFileDomainData,
}: IBankInfoPage) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<BankInfoProvider withdrawalBlockSetting={withdrawalBlockSetting}>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
					>
						<main>
							<section className='inside'>
								<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
								<BankInfo />
							</section>
						</main>
					</Layout>
				</BankInfoProvider>
			</GlobalDataProvider>
		</NovaAuthProvider>
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

export default BankInfoPage
