import { useTranslation } from 'next-i18next'
import LeaderBoardSection1 from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardEvent/LeaderBoardSection1'
import LeaderBoardSection2 from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardEvent/LeaderBoardSection2'
import { useLeaderBoard } from '@nx-next-app/features/F0001/providers/leaderBoard-context'
import { useAuth } from '@nx-next-app/data-access'
import { useGetLeaderBoardSettingQuery } from '@nx-next-app/service'

const LeaderBoardEventList = () => {
	const { t } = useTranslation()
	const { handleTermAndConditionClick } = useLeaderBoard()

	const {
		userInfo: { currencyId },
	} = useAuth()

	const { data: leaderBoardSettingResponseData } =
		useGetLeaderBoardSettingQuery({
			siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
			currencyId,
		})

	const { leaderboardPointCalculation, leaderboardRankingBonus = [] } =
		leaderBoardSettingResponseData?.data || {}
	const {
		sportTurnover = null,
		slotTurnover = null,
		liveCasinoTurnover = null,
	} = leaderboardPointCalculation || {}

	return (
		<div className='rankEvent active'>
			<div className='title'>
				{t('Label_LeaderBoard_Title_1')}
				<div>{t('Label_LeaderBoard_Title_2')}</div>
			</div>
			<div className='rankList'>
				<div className='title'>{t('Label_LeaderBoard_Point_Calculation')}</div>
				<ul>
					<li>
						<div>{t('Label_LeaderBoard_Product')}</div>
						<div>{t('Label_LeaderBoard_Valid_Turnover')}</div>
						<div>{t('Label_LeaderBoard_Point')}</div>
					</li>
					<LeaderBoardSection1
						sportTurnover={sportTurnover}
						slotTurnover={slotTurnover}
						liveCasinoTurnover={liveCasinoTurnover}
					/>
				</ul>
				<div className='title'>{t('Label_LeaderBoard_Monthly_Tournament')}</div>
				<ul>
					<li>
						<div>{t('Label_LeaderBoard_Ranking')}</div>
						<div>{t('Label_LeaderBoard_Min_Point')}</div>
						<div>{t('Label_LeaderBoard_Bonus_Credit')}</div>
					</li>
					{leaderboardRankingBonus.map((rankingData, index) => (
						<LeaderBoardSection2
							key={`${rankingData.siteId}-${rankingData.currencyId}-${rankingData.ranking}`}
							index={index}
							rank={rankingData.ranking}
							point={rankingData.minPoint}
							bonus={rankingData.bonus}
						/>
					))}
				</ul>
			</div>
			<div className='btn-group'>
				<a className='orange openPopup' onClick={handleTermAndConditionClick}>
					{t('Label_LeaderBoard_Terms&Conditions')}
				</a>
			</div>
		</div>
	)
}

export default LeaderBoardEventList
