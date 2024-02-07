import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getPromotion,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Promotion } from '@nx-next-app/features/F0001/desktop'
import { PromotionProvider } from '@nx-next-app/features/F0001/providers'
import { DeviceTypeEnum, IFooterData } from '@nx-next-app/types'
import { IPromotionData, IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA, PROMOTION_SELECT_OPTIONS } from '@nx-next-app/site/nova88'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'

interface IPromotionPageProps extends InitialPropsInterface {
	persistPromotionData: IPromotionData[]
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const PromotionPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistPromotionData,
	withdrawalBlockSetting,
}: IPromotionPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
					withdrawalBlockSetting={withdrawalBlockSetting}
				>
					<PromotionProvider
						persistPromotionData={persistPromotionData}
						PROMOTION_SELECT_OPTIONS={PROMOTION_SELECT_OPTIONS}
					>
						<Promotion />
					</PromotionProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const {
		originCookies,
		originLangId,
		originCurrencyId,
		currentHeaderCookies,
	} = initialProps
	const langId = originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	const persistPromotionData = await getPromotion(
		{
			langId: originLangId,
			currencyId: originCurrencyId,
			deviceType: DeviceTypeEnum.Desktop,
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			persistPromotionData,
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default PromotionPage
