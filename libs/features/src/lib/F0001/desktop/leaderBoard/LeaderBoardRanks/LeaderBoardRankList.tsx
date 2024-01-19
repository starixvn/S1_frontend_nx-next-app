import React from 'react'
import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/data-access'
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
					<div>{t('Label_General_Username').toUpperCase()}</div>
					{activeTab === LeaderBoardTabsEnum.Result ? null : (
						// 日排名隱藏status欄位，等ＰＭ通知再修正回顯示
						<div> {` `}</div>
						// <div>{t("lbl_Status")}</div>
					)}
					<div>{t('Label_LeaderBoard_Points').toUpperCase()}</div>
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
