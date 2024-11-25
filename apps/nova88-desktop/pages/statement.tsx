import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	Layout,
	LeftMenu,
	Statement,
} from '@nx-next-app/features/F0001/desktop'
import { StatementProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { QUICK_PICK_LIST } from '@nx-next-app/site/nova88/data/history'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface IStatementPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const StatementPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
	withdrawalBlockSetting,
}: IStatementPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<StatementProvider QUICK_PICK_LIST={QUICK_PICK_LIST} HEADER_TAGS={[]}>
						<main>
							<div className='wrapper-profile'>
								<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
								<Statement />
							</div>
						</main>
					</StatementProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

	const langId = initialProps.originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(
		initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]
	)

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default StatementPage
