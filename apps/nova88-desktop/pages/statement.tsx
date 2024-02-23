import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IFooterData } from '@nx-next-app/types'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { QUICK_PICK_LIST } from '@nx-next-app/site/nova88/data/history'
import { StatementProvider } from '@nx-next-app/features/F0001/providers'
import {
	Layout,
	LeftMenu,
	Statement,
} from '@nx-next-app/features/F0001/desktop'

interface IStatementPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const StatementPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	withdrawalBlockSetting,
}: IStatementPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<StatementProvider QUICK_PICK_LIST={QUICK_PICK_LIST} HEADER_TAGS={[]}>
						<main>
							<section className='inside'>
								<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
								<Statement />
							</section>
						</main>
					</StatementProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

	const langId = initialProps.originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(
		initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]
	)

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

export default StatementPage
