import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/features/F0006/providers/leaderBoard-context'
import LeaderBoardSection1 from './LeaderBoardSection1'
import LeaderBoardSection2 from './LeaderBoardSection2'

const LeaderBoardEventList = () => {
	const { t } = useTranslation()
	const {
		rewardData: { section1 = [], section2 = [] } = {},
		handleTermAndConditionClick,
	} = useLeaderBoard()

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
					{section1.map(item => (
						<LeaderBoardSection1 item={item} />
					))}
				</ul>
				<div className='title'>{t('Label_LeaderBoard_Monthly_Tournament')}</div>
				<ul>
					<li>
						<div>{t('Label_LeaderBoard_Ranking')}</div>
						<div>{t('Label_LeaderBoard_Min_Point')}</div>
						<div>{t('Label_LeaderBoard_Bonus_Credit')}</div>
					</li>
					{section2.map((item, index) => (
						<LeaderBoardSection2 item={item} index={index} />
					))}
				</ul>
				<button onClick={handleTermAndConditionClick}>
					{t('Label_LeaderBoard_Terms&Conditions')}
				</button>
			</div>
		</div>
	)
}

export default LeaderBoardEventList
