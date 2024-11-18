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
	getLobbyGamePage,
} from '@nx-next-app/data-access'
import { Layout, Fishing } from '@nx-next-app/features/F0001/desktop'
import { LobbyProvider } from '@nx-next-app/features/F0001/providers'
import { CATEGORY_SORT } from '@nx-next-app/site/nova88/data/slots'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ILobbyCategoryGameData } from '@nx-next-app/service'
import { IFooterData } from '@nx-next-app/types'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ILobbyPageProps = InitialPropsInterface & {
	footerData: IFooterData
	persistLobbyGameData: ILobbyCategoryGameData
	persistLobbyCategoryData: ILobbyCategoryGameData
}

const FishingPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
	persistStaticFileDomainData,
	persistLobbyGameData,
	persistLobbyCategoryData,
}: ILobbyPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<LobbyProvider
					persistLobbyGameData={persistLobbyGameData}
					persistLobbyCategoryData={persistLobbyCategoryData}
				>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<Fishing />
					</Layout>
				</LobbyProvider>
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
	const persistLobbyGameData = await getLobbyGamePage(
		{
			siteId: 1,
		  currencyId: 4,
		  lobbyCategoryIds: "7"
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
			persistLobbyGameData,
			persistLobbyCategoryData: pick(persistLobbyGameData, CATEGORY_SORT),
		},
	}
}

export default FishingPage
