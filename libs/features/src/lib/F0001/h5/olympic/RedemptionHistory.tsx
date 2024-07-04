import React from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { ICustDrawPrizeData } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat, isConvert } from '@nx-next-app/utils'

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
					{custRedeemHistoryList?.map(item => {
						const { drawTime, prizeId, amount } = item
						return (
							<div key={`history Record-${drawTime}`} className='sheet-item'>
								<div>
									<div>
										{/* 後端會增加一個是換幾個金牌數的欄位，prizeId是金牌數量 */}
										<span>
											{prizeId} {t('Label_Olympic_Gold_Medal')}
										</span>
										<span>{dayjs(drawTime).format('DD/MMMM/YY h:mm A')}</span>
									</div>
									<div>{bonusPrize(amount)}</div>
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
