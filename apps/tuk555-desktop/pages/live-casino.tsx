import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { GetServerSideProps } from 'next'
import { Layout, LiveCasino } from '@nx-next-app/features/F0001/desktop'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { FOOTER_DATA } from '@nx-next-app/site/tuk555'
import { IFooterData } from '@nx-next-app/types'

interface ILiveCasinoPage extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const LiveCasinoPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: ILiveCasinoPage) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<LiveCasino />
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

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default LiveCasinoPage
