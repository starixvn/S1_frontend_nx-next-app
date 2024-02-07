import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { INewsDetailData, IWithdrawalSetting } from '@nx-next-app/service'
import {
	AuthProvider,
	getNewsById,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import { Layout, News } from '@nx-next-app/features/F0001/desktop'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'

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
	persistNewsDetail,
	withdrawalBlockSetting,
}: INewsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout
					showFooter
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
					withdrawalBlockSetting={withdrawalBlockSetting}
				>
					<News persistNewsDetail={persistNewsDetail} />
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

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

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
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default NewsPage
