// import React from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { useOlympic } from '../../hooks'

const RedemptionHistory = () => {
	const { t } = useTranslation()
	const { custRedeemHistoryList } = useOlympic()

	return (
		<>
			<div className='olympic-bottom-title'>
				{t('Label_Olympic_Redemption_History')}
			</div>
			<div className='sheet'>
				<div className='sheet-content'>
					<div className='sheet-content-title'>
						{/* TODO: 串接後端api以取得玩家兌換bonus紀錄 */}
						<div>{t('Label_Olympic_Gold_Medal_Used')}</div>
						<div>{t('Label_General_Day')}</div>
						<div>{t('Label_General_Rewards')}</div>
					</div>
					<div className='sheet-content-text'>
						{custRedeemHistoryList?.map(item => {
							const { drawTime, prizeName } = item
							return (
								<div key={`history Record-${drawTime}`}>
									{/*  TODO: 後端會增加一個是換幾個金牌數的欄位 */}
									<div>3 {t('Label_Olympic_Gold_Medal')}</div>
									<div>{dayjs(drawTime).format('DD/MMMM/YY h:mm A')}</div>
									<div>{prizeName}</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export default RedemptionHistory
