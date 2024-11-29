import {
	AuthProvider,
	getPromotion,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Promotion } from '@nx-next-app/features/F0001/h5'
import { PromotionProvider } from '@nx-next-app/features/F0001/providers'
import { Layout } from '@nx-next-app/features/F0006/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IPromotionData } from '@nx-next-app/service'
import { PROMOTION_SELECT_OPTIONS } from '@nx-next-app/site/noble888'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IPromotionPageProps extends InitialPropsInterface {
	persistPromotionData: IPromotionData[]
}

const PromotionPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
	persistPromotionData,
}: IPromotionPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
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
