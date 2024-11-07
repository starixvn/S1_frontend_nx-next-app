import { NovaAuthProvider } from '@nova88-desktop/providers'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { GlobalDataProvider, getNewsById } from '@nx-next-app/data-access'
import { Layout, News } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { INewsDetailData } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface INewsPageProps extends InitialPropsInterface {
	persistNewsDetail: INewsDetailData
	persistFooterData: IFooterData
}

const NewsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	persistNewsDetail,
}: INewsPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout
					showFooter
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
				>
					<News persistNewsDetail={persistNewsDetail} />
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies } = initialProps
	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}

	const { id } = context.query
	const newsDetail = await getNewsById({
		langId,
		currencyId,
		newsId: Number(id),
	})

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			persistNewsDetail: newsDetail,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default NewsPage
