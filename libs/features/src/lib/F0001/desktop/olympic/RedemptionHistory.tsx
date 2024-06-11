// import React from 'react'
import { useTranslation } from 'next-i18next'

const RedemptionHistory = () => {
	const { t } = useTranslation()

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
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
						<div>
							<div>3 Gold Medals</div>
							<div>07/May/24 3:25 PM</div>
							<div>MYR 80</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RedemptionHistory
