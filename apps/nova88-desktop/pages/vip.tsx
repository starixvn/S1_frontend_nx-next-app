import { NovaAuthProvider } from '@nova88-desktop/providers'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { getVipBannerV2, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, Vip } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IVipBannerData } from '@nx-next-app/service'
import { ALLOWED_CURRENCIES, FOOTER_DATA } from '@nx-next-app/site/nova88'
import { IFooterData } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IVipPageProps extends InitialPropsInterface {
	vipBannerData: IVipBannerData
	persistFooterData: IFooterData
}

const VipPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	vipBannerData,
}: IVipPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<Vip vipBannerData={vipBannerData} />
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps
	const langId = originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	const vipBannerData = await getVipBannerV2(
		{
			currencyId: Number(currencyId),
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	if (!includes(ALLOWED_CURRENCIES['VIP'], Number(currencyId))) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			vipBannerData,
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default VipPage
