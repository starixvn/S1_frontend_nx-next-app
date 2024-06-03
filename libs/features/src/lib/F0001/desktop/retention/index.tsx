import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { Loading } from '@nx-next-app/components/D0001'
import { numberFormat } from '@nx-next-app/utils'

import {
	useRetentionLandingPage,
	useSetClaimPromotionFetcher,
} from '../../hooks'
import { includes } from 'lodash-es'

const imgHost = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop`

const RetentionContent = () => {
	const { push } = useRouter()
	const { t } = useTranslation()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const { promotionDetail, percentage, loading } = useRetentionLandingPage()
	// claim promotion
	const { setClaimPromotionHandler } = useSetClaimPromotionFetcher()

	const {
		userInfo: { currencyId, currencyName },
	} = useAuth()

	const showSwitchBar = includes(ALLOWED_CURRENCIES['LUCKY_WHEEL'], currencyId)

	const handleWheelClick = () => {
		push(paths.luckyWheel.root)
	}

	if (loading || !promotionDetail) return <Loading />

	const {
		isJoin = false,
		canJoin = false,
		custTurnOver = 0,
		custRollOver = 0,
		details = '',
	} = promotionDetail ?? {}

	if (loading) return <Loading />

	return (
		<main className='retention'>
			{showSwitchBar && (
				<div className='eventpage-tap'>
					<button onClick={handleWheelClick}>
						{t('Label_LuckyWheel_Title')}
					</button>
					<button className='active'>
						{t('Label_Retention_SurpriseReward')}
					</button>
				</div>
			)}
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
				<div className='bonus-list'>
					<div className='title'>
						<div>{t('Label_Retention_BonusTitle')}</div>
						<div></div>
					</div>
					{!details && <div></div>}
					{details && (
						<div
							dangerouslySetInnerHTML={{
								__html: `<div>${details}</pre>`,
							}}
						/>
					)}
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
	)
}

export default RetentionContent
