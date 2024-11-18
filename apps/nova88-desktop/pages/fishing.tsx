// import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
// import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
// import { Fishing, Layout } from '@nx-next-app/features/F0001/desktop'
// import {
// 	InitialPropsInterface,
// 	useServerSideInitialPropsFetcher,
// } from '@nx-next-app/hooks'
// import { FOOTER_DATA } from '@nx-next-app/site/nova88'
// import { IFooterData } from '@nx-next-app/types'
// import { GetServerSideProps } from 'next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// interface IFishingPageProps extends InitialPropsInterface {
// 	persistFooterData: IFooterData
// }

// const FishingPage = ({
// 	originIsSignIn,
// 	originCookies,
// 	persistSEOData,
// 	persistFooterData,
// 	persistStaticFileDomainData,
// }: IFishingPageProps) => {
// 	return (
// 		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
// 			<GlobalDataProvider
// 				persistStaticFileDomainData={persistStaticFileDomainData}
// 			>
// 				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
// 					<Fishing />
// 				</Layout>
// 			</GlobalDataProvider>
// 		</AuthProvider>
// 	)
// }

// export const getServerSideProps: GetServerSideProps = async context => {
// 	const initialProps = await useServerSideInitialPropsFetcher(context)
// 	const { originCookies } = initialProps

// 	const { langId, currencyId } = {
// 		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
// 		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
// 	}

// 	return {
// 		props: {
// 			persistFooterData: FOOTER_DATA({ langId, currencyId }),
// 			...initialProps,
// 			...(await serverSideTranslations(context.locale)),
// 		},
// 	}
// }

// export default FishingPage


import { DEVICE_TYPE, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getSlotGamePage,
} from '@nx-next-app/data-access'
import { Layout, Fishing } from '@nx-next-app/features/F0001/desktop'
import { SlotsProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ISlotsGameData } from '@nx-next-app/service'
import { CATEGORY_SORT } from '@nx-next-app/site/nova88/data/slots'
import { IFooterData } from '@nx-next-app/types'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ISlotsPageProps = InitialPropsInterface & {
	footerData: IFooterData
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}

const SlotsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
	persistStaticFileDomainData,
	persistSlotsGameData,
	persistSlotsCategoryData,
}: ISlotsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<SlotsProvider
					persistSlotsGameData={persistSlotsGameData}
					persistSlotsCategoryData={persistSlotsCategoryData}
				>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<Fishing />
					</Layout>
				</SlotsProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps
	const { currencyId } = {
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}
	const persistSlotsGameData = await getSlotGamePage(
		{
			deviceType: DEVICE_TYPE.Desktop,
			currencyId,
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
			persistSlotsGameData,
			persistSlotsCategoryData: pick(persistSlotsGameData, CATEGORY_SORT),
		},
	}
}

export default SlotsPage
