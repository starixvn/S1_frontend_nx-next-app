import React from 'react'
import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Sports } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting } from '@nx-next-app/service'

interface ISportsPageProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const SportsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	withdrawalBlockSetting,
}: ISportsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout
					hasGoTopBtn={false}
					persistSEOData={persistSEOData}
					withdrawalBlockSetting={withdrawalBlockSetting}
				>
					<main>
						<section className='inside'>
							<Sports />
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

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	return {
		props: {
			...initialProps,
			withdrawalBlockSetting,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default SportsPage
