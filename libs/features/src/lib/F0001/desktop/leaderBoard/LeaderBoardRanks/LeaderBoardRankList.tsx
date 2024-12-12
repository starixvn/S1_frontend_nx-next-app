import { useLeaderBoard } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import LeaderBoardRankItem from './LeaderBoardRankItem'

interface ILeaderBoardRankListProps {
	rankList: {
		custId?: number
		userName?: string
		wTurnover?: number
		status?: number
		rank?: string | number
	}[]
	activeTab: number
}

const LeaderBoardRankList = ({
	rankList,
	activeTab,
}: ILeaderBoardRankListProps) => {
	const { t } = useTranslation()
	const { LeaderBoardTabsEnum } = useLeaderBoard()
	return (
		<div className='rankList'>
			<ul>
				<li>
					<div>{t('Label_LeaderBoard_Ranking')}</div>
					<div>{t('Label_General_Username')}</div>
					<div>
						{/* {activeTab === LeaderBoardTabsEnum.Result ? null : ()} */}
					</div>
					<div>{t('Label_LeaderBoard_Points')}</div>
				</li>
				{rankList?.map((item, index) => (
					<LeaderBoardRankItem
						item={item}
						index={index}
						activeTab={activeTab}
					/>
				))}
			</ul>
		</div>
	)
}

export default LeaderBoardRankList
