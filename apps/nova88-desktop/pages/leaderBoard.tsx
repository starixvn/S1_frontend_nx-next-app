import React from 'react'
import { GetServerSideProps } from 'next'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	LEADER_BOARD_EVENT_CODE,
	LEADER_BOARD_GAME_POINT_NAV,
	LEADER_BOARD_MONTHS,
	LEADER_BOARD_RANK_NUM,
	LEADER_BOARD_REWARD_DATA,
	LEADER_BOARD_RANK_NAV,
	LEADER_BOARD_TABS,
	LeaderBoardDayEnum,
	LeaderBoardGameTypeEnum,
	LeaderBoardTabsEnum,
} from '@nx-next-app/site/nova88/data/leaderBoard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, LeaderBoard } from '@nx-next-app/features/F0001/desktop'
import LeaderBoardProvider from '@nx-next-app/features/F0001/providers/leaderBoard-context'

type ILeaderBoardPageProps = InitialPropsInterface

const LeaderBoardPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: ILeaderBoardPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<LeaderBoardProvider
						LEADER_BOARD_EVENT_CODE={LEADER_BOARD_EVENT_CODE}
						LEADER_BOARD_GAME_POINT_NAV={LEADER_BOARD_GAME_POINT_NAV}
						LEADER_BOARD_MONTHS={LEADER_BOARD_MONTHS}
						LEADER_BOARD_RANK_NUM={LEADER_BOARD_RANK_NUM}
						LEADER_BOARD_REWARD_DATA={LEADER_BOARD_REWARD_DATA}
						LEADER_BOARD_RANK_NAV={LEADER_BOARD_RANK_NAV}
						LEADER_BOARD_TABS={LEADER_BOARD_TABS}
						LeaderBoardDayEnum={LeaderBoardDayEnum}
						LeaderBoardGameTypeEnum={LeaderBoardGameTypeEnum}
						LeaderBoardTabsEnum={LeaderBoardTabsEnum}
					>
						<main>
							<LeaderBoard />
						</main>
					</LeaderBoardProvider>
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

export default LeaderBoardPage
