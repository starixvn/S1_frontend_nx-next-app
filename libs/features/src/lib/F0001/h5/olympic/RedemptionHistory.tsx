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
					<div className='sheet-item'>
						<div>
							<div>
								{/* TODO: 新增翻譯＋串接後端api以取得玩家兌換bonus紀錄 */}
								<span>8 Gold Medals</span>
								<span>07 / May / 24 3:25 PM</span>
							</div>
							<div>VND 1,200,000</div>
						</div>
					</div>
					<div className='sheet-item'>
						<div>
							<div>
								<span>8 Gold Medals</span>
								<span>07 / May / 24 3:25 PM</span>
							</div>
							<div>VND 1,200,000</div>
						</div>
					</div>
					<div className='sheet-item'>
						<div>
							<div>
								<span>8 Gold Medals</span>
								<span>07 / May / 24 3:25 PM</span>
							</div>
							<div>VND 1,200,000</div>
						</div>
					</div>
					<div className='sheet-item'>
						<div>
							<div>
								<span>8 Gold Medals</span>
								<span>07 / May / 24 3:25 PM</span>
							</div>
							<div>VND 1,200,000</div>
						</div>
					</div>
					<div className='sheet-item'>
						<div>
							<div>
								<span>8 Gold Medals</span>
								<span>07 / May / 24 3:25 PM</span>
							</div>
							<div>VND 1,200,000</div>
						</div>
					</div>
					<div className='sheet-item'>
						<div>
							<div>
								<span>8 Gold Medals</span>
								<span>07 / May / 24 3:25 PM</span>
							</div>
							<div>VND 1,200,000</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RedemptionHistory
