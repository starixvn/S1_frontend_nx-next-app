import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { paths } from '@nx-next-app/constants'
import {
	useGetPromotionDetailQuery,
	useLazyGetRetentionPromotionQuery,
} from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { Loading } from '@nx-next-app/components/D0001'
import { getPromotionPercentage, numberFormat } from '@nx-next-app/utils'
import { useEffect, useState } from 'react'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useSetClaimPromotionFetcher } from '../../hooks'

const imgHost = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop`

const RetentionContent = () => {
	const { push } = useRouter()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const [retentionBonusCode, setRetentionBonusCode] = useState<
		string | undefined
	>(undefined)

	const {
		userInfo: { langId, currencyId, currencyName },
	} = useAuth()

	const handleWheelClick = () => {
		push(paths.luckyWheel.root)
	}

	const [getRetentionPromotion, { isLoading: isGetRetentionPromotionLoading }] =
		useLazyGetRetentionPromotionQuery()

	const {
		data: { data: promotionDetail } = {},
		isLoading: isGetPromotionDetailLoading,
	} = useGetPromotionDetailQuery(
		{
			currencyId,
			langId,
			bonusCode: retentionBonusCode as string,
		},
		{
			skip: !retentionBonusCode,
		}
	)

	const {
		isJoin = false,
		canJoin = false,
		custTurnOver = 0,
		custRollOver = 0,
	} = promotionDetail ?? {}

	// claim promotion
	const { setClaimPromotionHandler } = useSetClaimPromotionFetcher()
	// progress bar logics
	const percentage = getPromotionPercentage({
		turnOver: custTurnOver,
		rollOver: custRollOver,
	})

	useEffect(() => {
		const init = async () => {
			try {
				const { data: { bonusCode = null } = {} } = await getRetentionPromotion(
					{ langId }
				).unwrap()
				if (bonusCode) {
					setRetentionBonusCode(bonusCode)
				} else {
					// 如果沒 bonusCode , 需要正確導回去 LuckyWheel
					push(paths.luckyWheel.root)
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		if (langId) {
			init()
		}
	}, [langId])

	if (isGetRetentionPromotionLoading || isGetPromotionDetailLoading)
		return <Loading />

	return (
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

					{promotionDetail && canJoin && (
						<button
							className='top-btn'
							onClick={() => {
								setClaimPromotionHandler(promotionDetail)
							}}
						>
							{t('Label_Promotion_ClaimNow')}
						</button>
					)}
				</div>
				<div className='retention-title'>
					{t('Label_Retention_Title')}
					<div>{t('Label_Retention_Content')}</div>
				</div>
				{isJoin && (
					<div className='turnover-progress'>
						<div className='turnover-title'>
							{t('Label_Retention_TurnoverTitle')}
						</div>
						<div className='turnover-item'>
							<div>
								<div className='number'>
									<div>
										{currencyName} {numberFormat(custTurnOver, currencyId)}
									</div>
									<div>
										/ {t('Label_General_Req')}. {currencyName}
										{numberFormat(custRollOver, currencyId)}
									</div>
								</div>
								<div className='progress'>
									<div
										className='progress-bar'
										style={{ width: `${percentage}%` }}
									/>
								</div>
								<div className='percent'>{percentage}%</div>
							</div>
						</div>
					</div>
				)}
				{/* <div className='bonus-list'>
						<div className='title'>
							<div>{t('Label_Retention_BonusTitle')}</div>
						</div>
					</div> */}
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
	)
}

export default RetentionContent
