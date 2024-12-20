import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import NewYearEventModal from '@nx-next-app/features/F0001/desktop/modal/NewYearEventModal'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
			console.log('open Multi')
			// setPopBox({
			// 	isOpen: true,
			// 	popBoxType: defPopBoxType.Modal,
			// 	className: 'pop dragonegg-result-pop',
			// 	content: <PrizePopBox isMulti={isMulti} />,
			// })
		} else {
			console.log('open single')
			modal.open(<NewYearEventModal />)
			// setPopBox({
			// 	isOpen: true,
			// 	popBoxType: defPopBoxType.Modal,
			// 	className: 'pop dragonegg-pop',
			// 	content: <DrawPopBox />,
			// })
		}
	}

	useEffect(() => {
		getMissionList()
	}, [langId])

	return (
		<div className='event-main'>
			<div className='event-task'>
				{missionList.length > 0 && (
					<div className='event-main-title'>{t('lbl_DragonEgg_DailyTask')}</div>
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
										className={`event-task-${eggCount === 1 ? 'one' : 'two'}`}
										src={getBannerUrl(
											`/desktop/img/event/dragonegg/daily-egg${
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
											? t('lbl_DragonEgg_Received')
											: t('lbl_DragonEgg_Go')}
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
						{t('lbl_DragonEgg_Eggs')}: <span>{eggTicket}</span>
					</div>
					<img
						className='event-draw-img'
						src={getBannerUrl(
							'/desktop/img/event/dragonegg/index-game-eggs.png'
						)}
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
						{t('lbl_DragonEgg_DrawNow')}
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
						{t('lbl_DragonEgg_ClickFor10')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Task
