import React from 'react'
import { includes } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { ENV_COOKIE_NAMES, EVENT_PERIOD } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ALLOWED_CURRENCIES, FOOTER_DATA } from '@nx-next-app/site/onetwobet'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LuckWheelProvider } from '@nx-next-app/operations'
import { IFooterData } from '@nx-next-app/types'

import { Layout, LuckyWheel } from '../components'

interface ILuckyWheelPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const LuckyWheelPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: ILuckyWheelPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<LuckWheelProvider>
						<LuckyWheel eventPeriod={EVENT_PERIOD.LUCKY_WHEEL} />
					</LuckWheelProvider>
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

	if (!includes(ALLOWED_CURRENCIES['LUCKY_WHEEL'], Number(currencyId))) {
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
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default LuckyWheelPage
