import { DEVICE_TYPE, ENV_COOKIE_NAMES, paths } from '@nx-next-app/constants'
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
import { CATEGORY_SORT } from '@nx-next-app/site/onetwobet/data/slots'
import { pick } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Layout } from '../components'
import Slots from '../components/slots'

type ISlotsPageProps = InitialPropsInterface & {
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}

const SlotsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
	persistSlotsGameData,
	persistSlotsCategoryData,
}: ISlotsPageProps) => {
	const router = useRouter()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<SlotsProvider
						persistSlotsGameData={persistSlotsGameData}
						persistSlotsCategoryData={persistSlotsCategoryData}
						onLoginRequired={() => router.push(paths.login.root)}
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
	const { currencyId } = {
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}
	const persistSlotsGameData = await getSlotGamePage(
		{
			deviceType: DEVICE_TYPE.Mobile,
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
