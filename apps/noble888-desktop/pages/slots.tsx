import { NovaAuthProvider } from '@noble888-desktop/providers'
import { DEVICE_TYPE, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { GlobalDataProvider, getSlotGamePage } from '@nx-next-app/data-access'
import { Layout, Slots } from '@nx-next-app/features/F0001/desktop'
import { SlotsProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ISlotsGameData } from '@nx-next-app/service'
import { CATEGORY_SORT } from '@nx-next-app/site/noble888/data/slots'
import { IFooterData } from '@nx-next-app/types'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ISlotsPageProps = InitialPropsInterface & {
	footerData: IFooterData
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}

const SlotsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
	persistStaticFileDomainData,
	persistSlotsGameData,
	persistSlotsCategoryData,
}: ISlotsPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<SlotsProvider
					persistSlotsGameData={persistSlotsGameData}
					persistSlotsCategoryData={persistSlotsCategoryData}
				>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<Slots />
					</Layout>
				</SlotsProvider>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps
	const { currencyId } = {
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
			...initialProps,
			...(await serverSideTranslations(context.locale)),
			persistSlotsGameData,
			persistSlotsCategoryData: pick(persistSlotsGameData, CATEGORY_SORT),
		},
	}
}

export default SlotsPage
