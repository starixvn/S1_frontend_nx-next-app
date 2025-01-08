import { DEVICE_TYPE, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getLobbyGamePage,
} from '@nx-next-app/data-access'
import { Layout, FourD } from '@nx-next-app/features/F0001/h5'
import { LobbyProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ILobbyCategoryGameData, LobbyCategory } from '@nx-next-app/service'
import { CATEGORY_LOBBY_SORT } from '@nx-next-app/site/nova88/data/lobby'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ILobbyPageProps = InitialPropsInterface & {
	persistLobbyGameData: ILobbyCategoryGameData
	persistLobbyCategoryData: ILobbyCategoryGameData
}


const FourDPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
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
					<Layout persistSEOData={persistSEOData}>
						<FourD />
					</Layout>
				</LobbyProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps

  const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId],
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}
	const persistLobbyGameData = await getLobbyGamePage(
		{
			siteId: parseInt(process.env['NEXT_PUBLIC_SITE_ID'], 10),
		  currencyId: currencyId as number,
		  lobbyCategoryIds: LobbyCategory.FourD.toString(),
      langId: langId as string
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
			persistLobbyGameData,
			persistLobbyCategoryData: pick(persistLobbyGameData, CATEGORY_LOBBY_SORT),
		},
	}
}

export default FourDPage
