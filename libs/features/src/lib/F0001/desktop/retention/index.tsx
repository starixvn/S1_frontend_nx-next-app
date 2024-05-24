import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { paths } from '@nx-next-app/constants'
import {
	useGetPromotionDetailQuery,
	useGetRetentionPromotionQuery,
} from '@nx-next-app/service'
import { useSetClaimPromotionFetcher } from '../../hooks'
import { useAuth } from '@nx-next-app/data-access'

const imgHost = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop`
const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

const RetentionContent = () => {
	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const { push } = useRouter()
	const { t } = useTranslation()

	const handleWheelClick = () => {
		push(paths.luckyWheel.root)
	}

	// 取得retention api 資料

	const { data } = useGetRetentionPromotionQuery({
		deviceType,
		langId,
	})

	// console.log('useGetRetentionPromotionQuery', data)

	// 取得retention api detail , pass bonusCode into api param

	const { data: { data: promotionDetail } = {} } = useGetPromotionDetailQuery({
		currencyId,
		langId,
		bonusCode: data?.data.bonusCode ?? '',
		deviceType,
	})

	// console.log 用來確認是否有取得資料

	console.log('useGetPromotionDetailQuery', promotionDetail)

	const {
		banner,
		title,
		description,
		cashBackDetails,
		promotionType,
		details,
		depositAmount,
		refList,
		depositId,
		canJoin,
		isJoin = false,
		custTurnOver,
		custRollOver,
		status,
		beenUsed,
		periodFrom,
		periodTo,
		tpId,
		categoryId,
	} = promotionDetail ?? {}

	// claim promotion

	const { setClaimPromotionHandler } = useSetClaimPromotionFetcher()

	// progress bar logics

	const progressPercentage =
		custTurnOver && custRollOver
			? ((custTurnOver / custRollOver) * 100).toFixed(2)
			: 0
	const progressBarWidth = `${progressPercentage}%`

	return (
		<>
			<main className='retention'>
				<div className='eventpage-tap'>
					<button onClick={handleWheelClick}>
						{t('Label_LuckyWheel_Title')}
					</button>
					<button className='active'>
						{t('Label_Retention_SurpriseReward')}
					</button>
				</div>
				<div className='retention-wrapper'>
					<div className='top'>
						<img
							className='top-item'
							src={`${imgHost}/img/event/retention/top-item.webp`}
							alt='retention-banner'
						/>
						<button
							className='top-btn'
							onClick={() => {
								push(
									`${paths.promotion.root}?BonusCode=${
										data && data.data.bonusCode
									}`
								)
							}}
							// data?.bonusCode
							// mars_retention_F
						>
							{/* {t('Label_Promotion_ClaimNow')} */}
							test get promotion link
						</button>

						{canJoin === true && isJoin === false && (
							<button
								className='top-btn'
								onClick={() => {
									setClaimPromotionHandler(promotionDetail!)
								}}
							>
								can claim
							</button>
						)}
					</div>
					<div className='retention-title'>
						{t('Label_Retention_Title')}
						<div>{t('Label_Retention_Content')}</div>
					</div>
					<div className='turnover-progress'>
						<div className='turnover-title'>
							{t('Label_Retention_TurnoverTitle')}
						</div>
						{isJoin === true && (
							<div className='turnover-item'>
								<div>
									<div className='number'>
										<div>{custTurnOver?.toLocaleString()}</div>
										<div>/{custRollOver?.toLocaleString()}</div>
									</div>
									 
									<div className='progress'>
										<div
											className='progress-bar'
											style={{ width: progressBarWidth }}
										/>
									</div>
									<div className='percent'>{progressPercentage}%</div>
								</div>
							</div>
						)}
					</div>
					<div className='bonus-list'>
						<div className='title'>
							<div>{t('Label_Retention_BonusTitle')}</div>
						</div>
					</div>
					<div className='chip'>
						<img
							src={`${imgHost}/img/event/retention/chip-one.png`}
							alt='chip-one'
						/>
						<img
							src={`${imgHost}/img/event/retention/chip-two.png`}
							alt='chip-two'
						/>
						<img
							src={`${imgHost}/img/event/retention/chip-three.png`}
							alt='chip-three'
						/>
					</div>
				</div>
			</main>
		</>
	)
}

export default RetentionContent
