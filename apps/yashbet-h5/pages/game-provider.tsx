import React from 'react'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0006/h5'
import GameProvider from '@nx-next-app/features/F0006/h5/game-provider'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FOOTER_DATA } from '@nx-next-app/site/yashbet'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

interface IGameProviderPageProps extends InitialPropsInterface {
	persistPlatformList: IFooterData['platformList']
}

const GameProviderPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistPlatformList,
}: IGameProviderPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<GameProvider platformList={persistPlatformList} />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies } = initialProps
	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}

	return {
		props: {
			persistPlatformList: FOOTER_DATA({ langId, currencyId }).platformList,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default GameProviderPage
