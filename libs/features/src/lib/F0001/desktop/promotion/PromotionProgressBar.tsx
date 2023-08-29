import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { getPromotionPercentage, numberFormat } from '@nx-next-app/utils'
import { SpinButton } from '@nx-next-app/components/D0001'

const PromotionProgressBar = ({
	custTurnOver,
	custRollOver,
	onSpinButton,
}: {
	custTurnOver: number
	custRollOver: number
	onSpinButton?: () => void
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()

	const percentage = getPromotionPercentage({
		turnOver: custTurnOver,
		rollOver: custRollOver,
	})

	return (
		<div className='progressBarModule'>
			<div className='bounsName'>
				{t('Label_Promotion_TurnoverAccumulated')}
			</div>
			<div className='turnover'>
				<span>
					{currencyName} {numberFormat(custTurnOver, currencyId)}
				</span>{' '}
				/ {t('Label_General_Req')}. {currencyName}{' '}
				{numberFormat(custRollOver, currencyId)}{' '}
				{onSpinButton && <SpinButton onClick={onSpinButton} />}
			</div>
			<div className='progressBar'>
				<div className='bar'>
					<div className='progress' style={{ width: `${percentage}%` }} />
				</div>
				<div className='percentage'>{percentage}%</div>
			</div>
		</div>
	)
}

export default PromotionProgressBar
