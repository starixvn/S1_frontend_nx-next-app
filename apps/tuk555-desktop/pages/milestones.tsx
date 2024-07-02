import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, MilestoneContent } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { FOOTER_DATA } from '@nx-next-app/site/tuk555'
import { IFooterData } from '@nx-next-app/types'
import {
	slideData,
	milestonesData,
} from '@nx-next-app/site/tuk555/data/milestoneData'

interface IJoinPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const MilestonePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: IJoinPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<main className='milestones'>
						<MilestoneContent
							milestonesData={milestonesData}
							slideData={slideData}
						/>
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

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default MilestonePage
