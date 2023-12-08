import React from 'react'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { SlotsProvider } from '@nx-next-app/features/F0002/providers'
import { Layout, Slots } from '@nx-next-app/features/F0002/desktop'
import {
	AuthProvider,
	GlobalDataProvider,
	getSlotGamePage,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { DEVICE_TYPE, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { ISlotsGameData } from '@nx-next-app/service'
import { IFooterData } from '@nx-next-app/types'
import { CATEGORY_SORT } from '@nx-next-app/site/leobet/data/slots'

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
	persistSlotsGameData,
	persistSlotsCategoryData,
}: ISlotsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<SlotsProvider
					persistSlotsGameData={persistSlotsGameData}
					persistSlotsCategoryData={persistSlotsCategoryData}
				>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<Slots />
					</Layout>
				</SlotsProvider>
			</GlobalDataProvider>
		</AuthProvider>
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
