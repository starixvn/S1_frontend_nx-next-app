import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	getPromotion,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { PromotionProvider } from '@nx-next-app/operations'
import { IPromotionData } from '@nx-next-app/service'
import {
	FOOTER_DATA,
	PROMOTION_SELECT_OPTIONS,
} from '@nx-next-app/site/onetwobet-indo'
import { DeviceTypeEnum, IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { Layout } from '../components'
import Promotion from '../components/promotion'

const PromotionDetailModal = dynamic(
	() =>
		import(
			'@12b-indo-desktop/components/modal/promotionDetailModal/PromotionDetailModal'
		),
	{ ssr: false }
)
interface IPromotionPageProps extends InitialPropsInterface {
	persistPromotionData: IPromotionData[]
	persistFooterData: IFooterData
}

const PromotionPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	persistPromotionData,
}: IPromotionPageProps) => {
	const { modal } = useGlobalModal()
	const handleOpenPromotionDetail = (bonusCode: string) => {
		modal.open(
			<PromotionDetailModal bonusCode={bonusCode} isHideAllPromoButton />
		)
	}

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<PromotionProvider
						persistPromotionData={persistPromotionData}
						PROMOTION_SELECT_OPTIONS={PROMOTION_SELECT_OPTIONS}
						onOpenPromotionDetail={handleOpenPromotionDetail}
						onError={modal.error}
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

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			persistPromotionData,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default PromotionPage
