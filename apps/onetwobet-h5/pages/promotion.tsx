import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getPromotion,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Promotion } from '@nx-next-app/features/F0001/h5'
import { PromotionProvider } from '@nx-next-app/features/F0001/providers'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { IPromotionData } from '@nx-next-app/service'
import { PROMOTION_SELECT_OPTIONS } from '@nx-next-app/site/onetwobet'

interface IPromotionPageProps extends InitialPropsInterface {
	persistPromotionData: IPromotionData[]
}

const PromotionPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,

	persistPromotionData,
}: IPromotionPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
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
	const { originLangId, originCurrencyId, currentHeaderCookies } = initialProps

	const persistPromotionData = await getPromotion(
		{
			langId: originLangId,
			currencyId: originCurrencyId,
			deviceType: DeviceTypeEnum.Desktop,
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	return {
		props: {
			persistPromotionData,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default PromotionPage
