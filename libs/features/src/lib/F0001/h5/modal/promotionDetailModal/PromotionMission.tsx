import { useAuth } from '@nx-next-app/data-access'
import { IPromotionData } from '@nx-next-app/service'
import { PromotionPeriodType } from '@nx-next-app/types'
import { numFormatToDigits } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IPromotionMissionProps {
	promotionDetail: IPromotionData
}

const PromotionMission = ({ promotionDetail }: IPromotionMissionProps) => {
	const [targetTask, setTargetTask] = useState<
		Partial<{
			requiredAmount: number
			requiredTurnover: number
			bonus: number
			maxBonus: number
			winOver: number
			rollOver: number
		}>
	>({})
	const { t } = useTranslation()
	const {
		userInfo: { currencyName },
	} = useAuth()

	const {
		tierAmountList,
		missionBonusProgress,
		fullFillType,
		periodType,
		bonusCode,
	} = promotionDetail
	const depositAmountSum =
		(missionBonusProgress && missionBonusProgress.depositAmountSum) || 0
	const turnoverSum =
		(missionBonusProgress && missionBonusProgress.turnoverSum) || 0

	const currentDate = dayjs().format('MM/DD')

	const getTaskStatusClassName = (target = 0, current = 0) =>
		current >= target ? 'completed' : 'undone'

	const getTaskStatusDisplayKey = (target = 0, current = 0) =>
		current >= target ? t('Label_Completed') : t('Label_OnGoing')

	const getTaskStatusProgress = (target = 0, current = 0) =>
		current >= target ? '100%' : `${(current / target) * 100}%`

	const getTaskCycle = () => {
		const periodTypeLabels: { [key: number]: string } = {
			[PromotionPeriodType.Daily]: t('Label_DailyTasks').toUpperCase(),
			[PromotionPeriodType.Weekly]: t('Label_WeeklyTasks').toUpperCase(),
			[PromotionPeriodType.Monthly]: t('Label_MonthlyTasks').toUpperCase(),
		}

		return periodTypeLabels[periodType] || ''
	}

	useEffect(() => {
		if (tierAmountList.length > 0) {
			const targetObj = tierAmountList.find(
				({ requiredAmount, requiredTurnover }) =>
					depositAmountSum < requiredAmount || turnoverSum < requiredTurnover
			)
			if (targetObj === undefined) {
				setTargetTask(
					tierAmountList.reduce((acc, cur) => {
						return acc.requiredAmount > cur.requiredAmount ? acc : cur
					}, tierAmountList[0])
				)
			} else {
				setTargetTask(targetObj)
			}
		}
	}, [bonusCode])

	if (tierAmountList.length > 0) {
		const isShowDeposit = tierAmountList.some(
			({ requiredAmount }) => requiredAmount !== 0
		)
		const isShowTurnover = tierAmountList.some(
			({ requiredTurnover }) => requiredTurnover !== 0
		)
		return (
			<>
				{tierAmountList.map(
					({ requiredAmount, requiredTurnover, rollOver, winOver, bonus }) => (
						<div
							className='rolloverList'
							key={`${requiredAmount}${requiredTurnover}${rollOver}${bonus}`}
						>
							{isShowDeposit && (
								<div className='row'>
									<div className='row-title'>
										{t('Label_Deposit').toUpperCase()}
									</div>
									<div className='row-value'>
										{currencyName} {numFormatToDigits(requiredAmount, 0)}
									</div>
								</div>
							)}
							{isShowTurnover && (
								<div className='row'>
									<div className='row-title'>
										{t('Label_General_Turnover').toUpperCase()}
									</div>
									<div className='row-value'>
										{currencyName} {numFormatToDigits(requiredTurnover, 0)}
									</div>
								</div>
							)}
							<div className='row'>
								<div className='row-title'>
									{fullFillType === 2
										? t('Label_General_WinOver')
										: t('Label_General_RollOver')}
								</div>
								<div className='row-value'>
									{fullFillType === 2 ? winOver : rollOver}X
								</div>
							</div>
							<div className='row'>
								<div className='row-title'>
									{t('Label_Promotion_Bonus').toUpperCase()}
								</div>
								<div className='row-value'>
									{currencyName} {numFormatToDigits(bonus, 0)}
								</div>
							</div>
						</div>
					)
				)}
				<div className='mission-content'>
					<div className='mission-title'>
						{currentDate} {getTaskCycle()}
					</div>
					<div className='mission-progress'>
						{isShowDeposit && (
							<div>
								<div className='mission-progress-item'>
									<div className='mission-progress-text'>
										<div>{t('Label_RequiredDepositAmount').toUpperCase()}</div>
									</div>
									<div className='progress'>
										<div
											className='progress-bar'
											style={{
												width: `${getTaskStatusProgress(
													targetTask?.requiredAmount,
													depositAmountSum
												)}`,
											}}
										/>
									</div>
									<div className='mission-number'>
										{numFormatToDigits(depositAmountSum, 0)}/
										{numFormatToDigits(targetTask?.requiredAmount ?? 0, 0)}
									</div>
								</div>
								<div
									className={`state ${getTaskStatusClassName(
										targetTask?.requiredAmount,
										depositAmountSum
									)}`}
								>
									{getTaskStatusDisplayKey(
										targetTask?.requiredAmount,
										depositAmountSum
									)}
								</div>
							</div>
						)}
						{isShowTurnover && (
							<div>
								<div className='mission-progress-item turnover'>
									<div className='mission-progress-text'>
										<div>{t('Label_RequiredTurnover').toUpperCase()}</div>
									</div>
									<div className='progress'>
										<div
											className='progress-bar'
											style={{
												width: `${getTaskStatusProgress(
													targetTask?.requiredTurnover,
													turnoverSum
												)}`,
											}}
										/>
									</div>
									<div className='mission-number'>
										{numFormatToDigits(turnoverSum, 0)}/
										{numFormatToDigits(targetTask?.requiredTurnover ?? 0, 0)}
									</div>
								</div>
								<div
									className={`state ${getTaskStatusClassName(
										targetTask?.requiredTurnover,
										turnoverSum
									)}`}
								>
									{getTaskStatusDisplayKey(
										targetTask?.requiredTurnover,
										turnoverSum
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</>
		)
	}
	return null
}

export default PromotionMission
