import { NovaAuthProvider } from '@noble888-h5/providers'
import {
	GlobalDataProvider,
	LeaderBoardProvider,
} from '@nx-next-app/data-access'
import { Layout, LeaderBoard } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
	LEADER_BOARD_EVENT_CODE,
	LEADER_BOARD_GAME_POINT_NAV,
	LEADER_BOARD_MONTHS,
	LEADER_BOARD_RANK_NAV,
	LEADER_BOARD_RANK_NUM,
	LEADER_BOARD_TABS,
	LeaderBoardDayEnum,
	LeaderBoardGameTypeEnum,
	LeaderBoardTabsEnum,
} from '@nx-next-app/site/nova88/data/leaderBoard'

type ILeaderBoardPageProps = InitialPropsInterface

const LeaderBoardPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: ILeaderBoardPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<LeaderBoardProvider
						LEADER_BOARD_EVENT_CODE={LEADER_BOARD_EVENT_CODE}
						LEADER_BOARD_GAME_POINT_NAV={LEADER_BOARD_GAME_POINT_NAV}
						LEADER_BOARD_MONTHS={LEADER_BOARD_MONTHS}
						LEADER_BOARD_RANK_NUM={LEADER_BOARD_RANK_NUM}
						LEADER_BOARD_RANK_NAV={LEADER_BOARD_RANK_NAV}
						LEADER_BOARD_TABS={LEADER_BOARD_TABS}
						LeaderBoardDayEnum={LeaderBoardDayEnum}
						LeaderBoardGameTypeEnum={LeaderBoardGameTypeEnum}
						LeaderBoardTabsEnum={LeaderBoardTabsEnum}
					>
						<LeaderBoard />
					</LeaderBoardProvider>
				</Layout>
			</GlobalDataProvider>
		</NovaAuthProvider>
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
