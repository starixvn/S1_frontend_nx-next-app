import React from 'react'
import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IFooterData } from '@nx-next-app/types'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IWithdrawalSetting } from '@nx-next-app/service'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { HistoryProvider } from '@nx-next-app/features/F0001/providers'
import { Layout, LeftMenu, History } from '@nx-next-app/features/F0001/desktop'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import {
	HISTORY_TABS,
	QUICK_PICK_LIST,
} from '@nx-next-app/site/nova88/data/history'

interface IHistoryPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const HistoryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	withdrawalBlockSetting,
}: IHistoryPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<HistoryProvider
						HISTORY_TABS={HISTORY_TABS}
						QUICK_PICK_LIST={QUICK_PICK_LIST}
					>
						<main>
							<section className='inside'>
								<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
								<History />
							</section>
						</main>
					</HistoryProvider>
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

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HistoryPage
