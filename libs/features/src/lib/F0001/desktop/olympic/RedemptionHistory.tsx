// import React from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { ICustDrawPrizeData } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { isConvert, numberFormat } from '@nx-next-app/utils'

interface IRedemptionHistory {
	custRedeemHistoryList: ICustDrawPrizeData[]
}
const RedemptionHistory = ({ custRedeemHistoryList }: IRedemptionHistory) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()

	// 兌換歷史紀錄的金額顯示處理（要千分位小數點，且VND IDR KRW要特別注意轉換）
	const bonusPrize = (amount: number) => {
		return `${currencyName} ${numberFormat(
			isConvert(currencyId) ? amount * 1000 : amount,
			currencyId,
			0,
			false
		)}`
	}

	return (
		<>
			<div className='olympic-bottom-title'>
				{t('Label_Olympic_Redemption_History')}
			</div>
			<div className='sheet'>
				<div className='sheet-content'>
					<div className='sheet-content-title'>
						{/* 串接後端api以取得玩家兌換bonus紀錄 */}
						<div>{t('Label_Olympic_Gold_Medal_Used')}</div>
						<div>{t('Label_General_Day')}</div>
						<div>{t('Label_General_Rewards')}</div>
					</div>
					<div className='sheet-content-text'>
						{custRedeemHistoryList?.map(item => {
							const { drawTime, prizeId, amount } = item
							return (
								<div key={`history Record-${drawTime}`}>
									{/*  後端會增加一個是換幾個金牌數的欄位，prizeId就是金牌數量 */}
									<div>
										{prizeId} {t('Label_Olympic_Gold_Medal')}
									</div>
									<div>{dayjs(drawTime).format('DD/MMMM/YY h:mm A')}</div>
									<div>{bonusPrize(amount)}</div>
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
