import Layout from '@12b-desktop/components/layout'
import NewsContents from '@12b-desktop/components/news/NewsContent'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getNewsById,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ProfileInfoProvider } from '@nx-next-app/operations'
import { INewsDetailData } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/onetwobet'
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
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout
					showFooter
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
				>
					<main>
						<section className='inside'>
							<ProfileInfoProvider>
								<NewsContents persistNewsDetail={persistNewsDetail} />
							</ProfileInfoProvider>
						</section>
					</main>
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
