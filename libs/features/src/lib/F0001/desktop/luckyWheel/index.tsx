import dayjs from 'dayjs'
import classNames from 'classnames'
import { useBoolean } from 'usehooks-ts'
import { useAuth } from '@nx-next-app/data-access'
import { Img, Loading, SpinButton } from '@nx-next-app/components/D0001'
import { useTranslation } from 'next-i18next'
import { toUpper, upperFirst } from 'lodash-es'
import { IEventPeriod } from '@nx-next-app/types'
import { useLuckWheelContext } from '@nx-next-app/features/F0001/providers'

interface ILuckyWheelProps {
	eventPeriod: IEventPeriod
}

const LuckyWheel = ({ eventPeriod }: ILuckyWheelProps) => {
	const {
		auth: { isLogin },
		userInfo: { currencyName },
	} = useAuth()
	const { t } = useTranslation()

	const {
		loading,
		isCheckDrawPrizeError,
		displayDrawPrizeList,
		custDrawPrizeList,
		onDrawPrize,
	} = useLuckWheelContext()

	const { value: isSpinning, setValue: setIsSpinning } = useBoolean(false)

	if (loading) return <Loading />

	return (
		<main className='wheelEvent'>
			<div className='eventPage'>
				<div className='eventTitleBg'>
					<div className='eventTitle'>{t('Label_LuckyWheel_Title')}</div>
				</div>
				<div className='wheelModule'>
					<Img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/wheel/wheelcover.png`}
						alt='img-wheelcover'
					/>

					<SpinButton
						className='' // * 給一個空字串，取消默認 的 className
						onSpinChange={isSpinning => isLogin && setIsSpinning(isSpinning)}
						onClick={onDrawPrize}
						timeout={isLogin && !isCheckDrawPrizeError ? 3000 : 0} // * 沒登入 以及 不能抽獎 時，不進入動畫時間
					>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/wheel/wheelbtn.png`}
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
						<span>{toUpper(t('Label_LuckyWheel_RewardsCondition') || '')}</span>
						<div className='title'>
							{t('Label_LuckyWheel_EventLuckyWheel', {
								value1: toUpper(process.env['NEXT_PUBLIC_SITE_NAME']),
							})}
						</div>
						<div>
							{t('Label_General_Start')}:{' '}
							{dayjs(eventPeriod.start).format('YYYY-MM-DD HH:mm:ss')} GMT
							{dayjs().format('Z')}
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
									site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
								})}
							</li>
							<li>
								{t('Label_LuckyWheel_OtherConditions4', {
									site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
								})}
							</li>
							<li>
								{t('Label_LuckyWheel_OtherConditions5', {
									site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
								})}
							</li>
						</ul>
					</div>
					<div className='luckyBox title'>
						<span>{t('Label_LuckyWheel_MyLuckWheelRewards')}</span>
					</div>

					{!isLogin || custDrawPrizeList.length === 0 ? (
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
										<div>{dayjs(drawTime).format('YYYY/MM/DD HH:mm:ss')}</div>
										<div>{prizeName}</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}

export default LuckyWheel
