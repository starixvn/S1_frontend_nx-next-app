import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	getVipBanner,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, Vip } from '@nx-next-app/features/F0006/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IVipBannerData } from '@nx-next-app/service'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/yashbet'
import { includes } from 'lodash'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IVipPageProps extends InitialPropsInterface {
	vipBannerData: IVipBannerData
}

const VipPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
	vipBannerData,
}: IVipPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<Vip vipBannerData={vipBannerData} />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps
	const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

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
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default VipPage
