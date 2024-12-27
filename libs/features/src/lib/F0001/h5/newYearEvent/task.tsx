import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import {
	DrawPopBox,
	PrizePopBox,
} from '@nx-next-app/features/F0001/h5/modal/NewYearEventModal'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
	CategoryIdEnum,
	PromotionMissionTypeEnum,
	useNewYearEvent,
} from '../../hooks'

const Task = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuth()

	const { push } = useRouter()

	const { modal } = useGlobalModal()

	const { getBannerUrl } = useGlobalData()

	const { eggTicket, missionList, getMissionList } = useNewYearEvent()

	const goMission = ({
		type,
		tpCategoryId,
	}: {
		type: number
		tpCategoryId: number
	}) => {
		let targetPath = ''

		if (type === PromotionMissionTypeEnum.referFriend) {
			targetPath = paths.referral.root
		} else if (type === PromotionMissionTypeEnum.accumulateDeposit) {
			targetPath = paths.deposit.root
		} else if (tpCategoryId === CategoryIdEnum.sports) {
			targetPath = paths.sports.root
		} else if (tpCategoryId === CategoryIdEnum.slots) {
			targetPath = paths.slots.root
		} else if (tpCategoryId === CategoryIdEnum.liveCasino) {
			targetPath = paths.liveCasino.root
		}

		push(`/${langId}/${targetPath}`)
	}

	const drawPrize = ({ isMulti }: { isMulti: boolean }) => {
		if (isMulti) {
			modal.open(<PrizePopBox isMulti />, { className: 'newyear-mask' })
		} else {
			modal.open(<DrawPopBox />, { className: 'newyear-mask' })
		}
	}

	useEffect(() => {
		getMissionList()
	}, [langId])

	return (
		<div className='event-main'>
			<div className='event-task'>
				{missionList.length > 0 && (
					<div className='event-main-title'>
						{t('Label_DragonEgg_DailyTask')}
					</div>
				)}
				{missionList.map(
					({
						type,
						eggCount,
						goalAmount,
						isCompleted,
						missionName,
						tpCategoryId,
						progressAmount,
					}) => {
						const percentage =
							progressAmount > goalAmount
								? 100
								: ((progressAmount / goalAmount) * 100).toFixed(2)

						return (
							<div className='event-task-item' key={missionName}>
								<div className='event-task-info'>
									<div className='text'>{missionName}</div>
									<div className='progress'>
										<div
											className='progress-bar'
											style={{ width: `${percentage}%` }}
										/>
									</div>
									{type === PromotionMissionTypeEnum.referFriend ? (
										<div className='progress-info'>
											<span>{progressAmount}</span> /{goalAmount}
										</div>
									) : (
										<div className='progress-info'>
											<span>{numberFormat(progressAmount, currencyId, 0)}</span>
											/{numberFormat(goalAmount, currencyId, 0)}
										</div>
									)}
								</div>
								<div
									className={classNames('event-task-inner', {
										active: isCompleted,
									})}
									onClick={() => {
										if (!isCompleted)
											goMission({
												type,
												tpCategoryId,
											})
									}}
								>
									<img
										className={classNames({
											[eggCount === 1 ? 'event-task-one' : 'event-task-two']:
												true,
										})}
										src={getBannerUrl(
											`/h5/img/event/dragonegg/daily-egg${
												eggCount === 1 ? '1' : '2'
											}${isCompleted ? '-ok' : ''}.png`
										)}
										alt='daily_egg'
									/>
									<button
										className={classNames('event-task-btn', {
											active: isCompleted,
										})}
									>
										{isCompleted
											? t('Label_DragonEgg_Received')
											: t('Label_DragonEgg_Go')}
									</button>
								</div>
							</div>
						)
					}
				)}
			</div>
			<div className='event-draw'>
				<div className='event-draw-egg'>
					<div className='event-draw-value'>
						{t('Label_DragonEgg_Eggs')}: <span>{eggTicket}</span>
					</div>
					<img
						className='event-draw-img'
						src={getBannerUrl('/h5/img/event/dragonegg/index-game-eggs.png')}
						alt='draw_dragon'
					/>
				</div>
				<div className='event-draw-btn'>
					<button
						className={classNames('draw-single', {
							active: eggTicket > 0,
						})}
						onClick={() => {
							if (eggTicket > 0)
								drawPrize({
									isMulti: false,
								})
						}}
					>
						{t('Label_DragonEgg_DrawNow')}
					</button>
					<button
						className={classNames('draw-ten', {
							active: eggTicket >= 10,
						})}
						onClick={() => {
							if (eggTicket >= 10)
								drawPrize({
									isMulti: true,
								})
						}}
					>
						{t('Label_DragonEgg_ClickFor10')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Task
