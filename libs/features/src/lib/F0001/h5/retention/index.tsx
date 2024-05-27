import { useRouter } from 'next/router'
import { Header } from '@nx-next-app/components/H0001'
import { useTranslation } from 'react-i18next'
import { paths } from '@nx-next-app/constants'
import {
	useGetPromotionDetailQuery,
	useGetRetentionPromotionQuery,
} from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'
import { getPromotionPercentage, numberFormat } from '@nx-next-app/utils'
import { useSetClaimPromotionFetcher } from '../../hooks'

const imgHost = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5`
const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

const RetentionContent = () => {
	const { push } = useRouter()
	const { t } = useTranslation()

	const {
		userInfo: { langId, currencyId, currencyName },
	} = useAuth()

	const handleWheelClick = () => {
		push(paths.luckyWheel.root)
	}

	const { data: { data: { bonusCode = '' } = {} } = {} } =
		useGetRetentionPromotionQuery({
			deviceType,
			langId,
		})
	// console.log('retiontion', bonusCode)
	const { data: { data: promotionDetail } = {} } = useGetPromotionDetailQuery({
		currencyId,
		langId,
		bonusCode,
		deviceType,
	})
	// console.log('detail', promotionDetail)
	const {
		isJoin = false,
		canJoin = true,
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

	return (
		<>
			<Header className='header' style={{ zIndex: '4' }}>
				<Header.Tag
					title={t('Label_Retention') as string}
					back={paths.home.root}
				/>
			</Header>

			<main className='retention'>
				<div className='eventpage-tap' style={{ zIndex: '3' }}>
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
							alt='banner-retention'
						/>
						{promotionDetail && canJoin === true && (
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
					{isJoin === true && (
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
											{numberFormat(custRollOver, currencyId)}{' '}
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
							<div>Bonus Play Conditions</div>
							<div></div>
						</div>
					</div> */}
				</div>
			</main>
		</>
	)
}

export default RetentionContent
