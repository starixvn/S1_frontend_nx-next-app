import Layout from '@12b-desktop/components/layout'
import LeftMenu from '@12b-desktop/components/leftMenu'
import NewsContents from '@12b-desktop/components/news/NewsContent'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getNewsById,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ProfileInfoProvider } from '@nx-next-app/operations'
import { INewsDetailData, IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/onetwobet'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface INewsPageProps extends InitialPropsInterface {
	persistNewsDetail: INewsDetailData
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const NewsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	persistNewsDetail,
	withdrawalBlockSetting,
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
							<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
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
	const { currentHeaderCookies } = initialProps
	const { originCookies } = initialProps
	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	const { id } = context.query
	const newsDetail = await getNewsById({
		langId,
		currencyId,
		newsId: Number(id),
	})

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			persistNewsDetail: newsDetail,
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default NewsPage
