import React from 'react'
import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import { Layout, AppDownload } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AppDownloadProvider } from '@nx-next-app/features/F0001/providers'
import { APP_DOWNLOAD_LIST } from '@nx-next-app/site/nova88/data/appDownload'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'
import { IWithdrawalSetting } from '@nx-next-app/service'

interface IAppDownloadPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const AppDownloadPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	withdrawalBlockSetting,
}: IAppDownloadPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<AppDownloadProvider APP_DOWNLOAD_LIST={APP_DOWNLOAD_LIST}>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
						withdrawalBlockSetting={withdrawalBlockSetting}
					>
						<AppDownload />
					</Layout>
				</AppDownloadProvider>
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

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default AppDownloadPage
