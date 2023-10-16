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
} from '@nx-next-app/site/leobet/data/leaderBoard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, LeaderBoard } from '@nx-next-app/features/F0001/desktop'
import { LeaderBoardProvider } from '@nx-next-app/features/F0001/providers'
import { FOOTER_DATA } from '@nx-next-app/site/leobet'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

interface ILeaderBoardPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const LeaderBoardPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: ILeaderBoardPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
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

export default LeaderBoardPage
