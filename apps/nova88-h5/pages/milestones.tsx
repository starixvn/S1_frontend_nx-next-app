import React from 'react'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, MilestoneConent } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	slideData,
	milestonesData,
} from '@nx-next-app/site/nova88/data/milestoneData'

type ILuckyWheelPageProps = InitialPropsInterface

const MilestonesPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: ILuckyWheelPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<MilestoneConent
						slideData={slideData}
						milestonesData={milestonesData}
					/>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default MilestonesPage
