import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	getBanner,
	getHotEvent,
	getHotGame,
	getPromotion,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Home, Layout } from '@nx-next-app/features/F0001/desktop'
import { HomeProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	IBannerData,
	IHotEventData,
	IHotGame,
	IPromotionData,
	TpCategory,
} from '@nx-next-app/service'
import { DESKTOP_HOME_ORDERS, FOOTER_DATA } from '@nx-next-app/site/nova88'
import { BannerTypeEnum, IFooterData } from '@nx-next-app/types'
import dayjs from 'dayjs'
import { filter } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import path from 'path'

// This is the setting required to optimize the project export. It is optimized due to the nx configuration path conflict.
// Optimize the file structure of the project build, output only the necessary resources independently instead of the entire node_module package, and control the docker image size
// https://nextjs.org/docs/pages/api-reference/next-config-js/output
// https://github.com/nrwl/nx/issues/9017
// path.resolve will resolve the specified path into an absolute path
// This parsing is so that when next is output, the next.config of the current project can be correctly read.
// A small trick used to solve the path conflict of nx on the next project
path.resolve('./next.config.js')

interface IHomePageProps extends InitialPropsInterface {
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistNewGameData: IHotGame[]
	persistProviderData: IHotGame[]
	persistFooterData: IFooterData
}

const HomePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistHotGameData,
	persistNewGameData,
	persistProviderData,
	persistFooterData,
	persistStaticFileDomainData,
}: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout
					showFooter
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
				>
					<HomeProvider
						persistBannerData={persistBannerData}
						persistPromotionData={persistPromotionData}
						persistHotEventData={persistHotEventData}
						persistHotGameData={persistHotGameData}
						persistNewGameData={persistNewGameData}
						persistProviderData={persistProviderData}
						persistLicenseData={persistFooterData.licenseData}
						persistQuickLinksList={persistFooterData.quickLinks}
						persistPlatformList={persistFooterData.platformList}
						desktopHomeOrders={DESKTOP_HOME_ORDERS}
					>
						<Home />
					</HomeProvider>
				</Layout>
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

	const [
		persistBannerData,
		rawPromotionData,
		persistHotEventData,
		hotGameData,
	] = await Promise.all([
		getBanner(
			{
				langId,
				currencyId,
				bannerTypes: [BannerTypeEnum.Main],
			},
			{ headers: { cookie: currentHeaderCookies } }
		),
		getPromotion(
			{
				langId,
				currencyId,
				deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
			},
			{ headers: { cookie: currentHeaderCookies } }
		),
		getHotEvent({ langId }),
		getHotGame({
			deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
			top: 50,
			tpCategory: [
				TpCategory.Sports,
				TpCategory.Casino,
				TpCategory.LiveCasino,
				TpCategory.ESports,
				TpCategory.Games,
			].toString(),
			currencyId,
		}),
	])

	const { HotGame: persistHotGameData = [] } = hotGameData ?? {}
	const { NewGame: persistNewGameData = [] } = hotGameData ?? {}
	const { Provider: persistProviderData = [] } = hotGameData ?? {}

	const persistPromotionData = filter(
		rawPromotionData,
		({ displayFrom, displayTo }) => {
			return dayjs().isBetween(dayjs.unix(displayFrom), dayjs.unix(displayTo))
		}
	)

	return {
		props: {
			persistBannerData,
			persistPromotionData,
			persistHotEventData,
			persistHotGameData,
			persistNewGameData,
			persistProviderData,
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HomePage
