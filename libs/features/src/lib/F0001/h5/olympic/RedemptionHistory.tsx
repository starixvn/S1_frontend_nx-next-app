import React from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { ICustDrawPrizeData } from '@nx-next-app/service'

interface IRedemptionHistory {
	custRedeemHistoryList: ICustDrawPrizeData[]
}
const RedemptionHistory = ({ custRedeemHistoryList }: IRedemptionHistory) => {
	const { t } = useTranslation()

	return (
		<>
			<div className='olympic-bottom-title'>
				{t('Label_Olympic_Redemption_History')}
			</div>
			<div className='sheet'>
				<div className='sheet-content'>
					{custRedeemHistoryList?.map(item => {
						const { drawTime, prizeName } = item
						return (
							<div key={`history Record-${drawTime}`} className='sheet-item'>
								<div>
									<div>
										{/*  TODO: 後端會增加一個是換幾個金牌數的欄位 */}
										<span>3 {t('Label_Olympic_Gold_Medal')}</span>
										<span>{dayjs(drawTime).format('DD/MMMM/YY h:mm A')}</span>
									</div>
									<div>{prizeName}</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default RedemptionHistory
