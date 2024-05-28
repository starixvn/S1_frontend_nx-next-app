import { Header, Img, Loading, SpinButton } from '@nx-next-app/components/H0001'
import { useAuth } from '@nx-next-app/data-access'
import { IEventPeriod } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { useLuckWheelContext } from '@nx-next-app/features/F0001/providers'
import { useBoolean } from 'usehooks-ts'
import classNames from 'classnames'
import { toUpper, upperFirst } from 'lodash-es'
import dayjs from 'dayjs'
import { paths } from '@nx-next-app/constants'
import { useGetRetentionPromotionQuery } from '@nx-next-app/service'
import { useRouter } from 'next/router'

interface ILuckyWheelProps {
	eventPeriod: IEventPeriod
}

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

const LuckyWheel = ({ eventPeriod }: ILuckyWheelProps) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const {
		loading,
		isCheckDrawPrizeError,
		displayDrawPrizeList,
		custDrawPrizeList,
		onDrawPrize,
	} = useLuckWheelContext()

	const {
		auth: { isLogin },
		userInfo: { currencyName, langId },
	} = useAuth()

	const handleWheelClick = () => {
		push(paths.retention.root)
	}

	const { value: isSpinning, setValue: setIsSpinning } = useBoolean(false)
	// call getRetentionPromotion api to see if users are qualified to get retention promotion
	const { data: { data: { bonusCode = '' } = {} } = {} } =
		useGetRetentionPromotionQuery({
			deviceType,
			langId,
		})
	// seee if data is existed
	// console.log('retention', bonusCode)
	// seee if data is existed
	if (loading) return <Loading />

	return (
		<>
			<Header className='header' style={{ zIndex: 4 }}>
				<Header.Tag
					title={t('Label_LuckyWheel_Title') as string}
					back={paths.home.root}
				/>
			</Header>

			<main className='main wheelEvent'>
				<div className='eventpage-tap' style={{ zIndex: 3 }}>
					<button className='active'> {t('Label_LuckyWheel_Title')}</button>
					{bonusCode && (
						<button className='' onClick={handleWheelClick}>
							{t('Label_Retention_SurpriseReward')}
						</button>
					)}
				</div>
				<div className='eventPage'>
					<div className='eventTitleBg'>
						<div className='eventTitle'>LUCKY WHEEL</div>
					</div>
					<div className='wheelModule'>
						<Img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/wheel/wheelcover.png`}
							alt='img-wheelcover'
						/>

						<SpinButton
							className='' // * 給一個空字串，取消默認 的 className
							onSpinChange={isSpinning => isLogin && setIsSpinning(isSpinning)}
							onClick={onDrawPrize}
							timeout={isLogin && !isCheckDrawPrizeError ? 3000 : 0} // * 沒登入 以及 不能抽獎 時，不進入動畫時間
						>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/wheel/wheelbtn.png`}
								alt='img-wheelbtn'
							/>
						</SpinButton>

						<div className={classNames('wheel', { active: isSpinning })}>
							<ul>
								{displayDrawPrizeList.map(({ prizeId, prizeName }) => (
									<li key={prizeId}>
										<p>{prizeName}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='info'>
						<div className='rewards title'>
							<span>
								{toUpper(t('Label_LuckyWheel_RewardsCondition') || '')}
							</span>
							<div className='title'>
								{t('Label_LuckyWheel_EventLuckyWheel', {
									value1: toUpper(process.env['NEXT_PUBLIC_SITE_NAME']),
								})}
							</div>
							<div>
								{t('Label_General_Start')}:{' '}
								{dayjs(eventPeriod.start).format('YYYY-MM-DD HH:mm:ss')}
								GMT+08:00
							</div>
							<div>{t('Label_LuckyWheel_DepositToday')}</div>
						</div>
						<div className='other title'>
							<span>{t('Label_LuckyWheel_OtherCondition')}</span>
							<ul>
								<li>{t('Label_LuckyWheel_OtherConditions1')}</li>
								<li>{t('Label_LuckyWheel_OtherConditions2')}</li>
								<li>
									{t('Label_LuckyWheel_OtherConditions3', {
										site: upperFirst(
											process.env['NEXT_PUBLIC_SITE_NAME'] || ''
										),
									})}
								</li>

								<li>
									{t('Label_LuckyWheel_OtherConditions4', {
										site: upperFirst(
											process.env['NEXT_PUBLIC_SITE_NAME'] || ''
										),
									})}
								</li>
								<li>
									{t('Label_LuckyWheel_OtherConditions5', {
										site: upperFirst(
											process.env['NEXT_PUBLIC_SITE_NAME'] || ''
										),
									})}
								</li>
							</ul>
						</div>
						{isLogin && (
							<>
								<div className='luckyBox title'>
									<span>{t('Label_LuckyWheel_MyLuckWheelRewards')}</span>
								</div>

								{custDrawPrizeList.length === 0 ? (
									<div className='nodata icon icon-nodata'>
										<div className='txt-white'>{t('Label_General_NoData')}</div>
									</div>
								) : (
									<div className='eventList'>
										<div className='listBoxShadow'>
											<div>
												<div>
													<div>
														{t('Label_General_Day')} ( {dayjs().format('Z')} )
													</div>
												</div>
												<div>
													{t('Label_General_LatestAwards')} ( {currencyName} )
												</div>
											</div>
											{custDrawPrizeList.map(({ drawTime, prizeName }) => (
												<div>
													<div>
														{dayjs(drawTime).format('YYYY/MM/DD HH:mm:ss')}
													</div>
													<div>{prizeName}</div>
												</div>
											))}
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

export default LuckyWheel
