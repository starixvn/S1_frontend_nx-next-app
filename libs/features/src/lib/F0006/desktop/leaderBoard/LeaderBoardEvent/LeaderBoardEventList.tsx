import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/data-access'
import LeaderBoardSection1 from './LeaderBoardSection1'
import LeaderBoardSection2 from './LeaderBoardSection2'

const LeaderBoardEventList = () => {
	const { t } = useTranslation()
	const { leaderBoardSettingResponseData, handleTermAndConditionClick } =
		useLeaderBoard()

	const { sportTurnover, slotTurnover, liveCasinoTurnover } =
		leaderBoardSettingResponseData?.leaderboardPointCalculation || {}

	return (
		<div className='eventRule active'>
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
					{leaderBoardSettingResponseData?.leaderboardRankingBonus.map(
						(rankingData, index) => (
							<LeaderBoardSection2
								key={`${rankingData.siteId}-${rankingData.currencyId}-${rankingData.ranking}`}
								index={index}
								rank={rankingData.ranking}
								point={rankingData.minPoint}
								bonus={rankingData.bonus}
							/>
						)
					)}
				</ul>
				<button onClick={handleTermAndConditionClick}>
					{t('Label_LeaderBoard_Terms&Conditions')}
				</button>
			</div>
		</div>
	)
}

export default LeaderBoardEventList
