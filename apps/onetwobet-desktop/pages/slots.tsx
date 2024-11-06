import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DEVICE_TYPE, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getSlotGamePage,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { SlotsProvider } from '@nx-next-app/operations'
import { ISlotsGameData } from '@nx-next-app/service'
import { CATEGORY_SORT, FOOTER_DATA } from '@nx-next-app/site/onetwobet'
import { IFooterData } from '@nx-next-app/types'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { Layout, Slots } from '../components'

const LoginModal = dynamic(
	() => import('@12b-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

type ISlotsPageProps = InitialPropsInterface & {
	persistFooterData: IFooterData
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}

const SlotsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	persistSlotsGameData,
	persistSlotsCategoryData,
}: ISlotsPageProps) => {
	const { modal } = useGlobalModal()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<SlotsProvider
						persistSlotsGameData={persistSlotsGameData}
						persistSlotsCategoryData={persistSlotsCategoryData}
						onLoginRequired={() => modal.open(<LoginModal />)}
					>
						<Slots />
					</SlotsProvider>
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
	const persistSlotsGameData = await getSlotGamePage(
		{
			deviceType: DEVICE_TYPE.Desktop,
			currencyId,
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
			persistSlotsGameData,
			persistSlotsCategoryData: pick(persistSlotsGameData, CATEGORY_SORT),
		},
	}
}

export default SlotsPage
