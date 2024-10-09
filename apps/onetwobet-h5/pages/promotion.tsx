import { useGlobalModal } from '@nx-next-app/components/config-provider'
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
import { PROMOTION_SELECT_OPTIONS } from '@nx-next-app/site/onetwobet'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { Layout, Promotion } from '../components'

const PromotionDetailModal = dynamic(
	() => import('../components/modal/promotionDetailModal/PromotionDetailModal'),
	{ ssr: false }
)

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
	const { modal } = useGlobalModal()
	const handleOpenPromotionDetail = (bonusCode: string) => {
		modal.open(<PromotionDetailModal bonusCode={bonusCode} />, {
			className: 'promospop',
		})
	}

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
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
