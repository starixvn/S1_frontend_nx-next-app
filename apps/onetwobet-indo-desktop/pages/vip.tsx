import { Layout, Vip } from '@12b-indo-desktop/components/index'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getVipBanner,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IVipBannerData } from '@nx-next-app/service'
import {
	ALLOWED_CURRENCIES,
	FOOTER_DATA,
} from '@nx-next-app/site/onetwobet-indo'
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
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<Vip vipBannerData={vipBannerData} />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps
	const langId = originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	const vipBannerData = await getVipBanner(
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
