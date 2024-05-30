import { useRouter } from 'next/router'
import { Header, Loading } from '@nx-next-app/components/H0001'
import { useTranslation } from 'react-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import {
	useRetentionLandingPage,
	useSetClaimPromotionFetcher,
} from '../../hooks'

const imgHost = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5`

const RetentionContent = () => {
	const { push } = useRouter()
	const { t } = useTranslation()

	const { promotionDetail, percentage, loading } = useRetentionLandingPage()
	// claim promotion
	const { setClaimPromotionHandler } = useSetClaimPromotionFetcher()

	const {
		userInfo: { currencyId, currencyName },
	} = useAuth()

	const handleWheelClick = () => {
		push(paths.luckyWheel.root)
	}

	const {
		isJoin = false,
		canJoin = false,
		custTurnOver = 0,
		details = '',
		custRollOver = 0,
	} = promotionDetail ?? {}

	if (loading) return <Loading />

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
					<div className='bonus-list'>
						<div className='title'>
							<div>{t('Label_Retention_BonusTitle')}</div>
							<div></div>
						</div>
						{details && (
							<div
								dangerouslySetInnerHTML={{
									__html: `<pre>${details}</pre>`,
								}}
							/>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

export default RetentionContent
