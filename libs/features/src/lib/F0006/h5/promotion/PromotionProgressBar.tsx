import { SpinButton } from '@nx-next-app/components/H0006'
import { useAuth } from '@nx-next-app/data-access'
import { getPromotionPercentage, numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

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
		userInfo: { currencyId },
	} = useAuth()

	const percentage = getPromotionPercentage({
		turnOver: custTurnOver,
		rollOver: custRollOver,
	})

	return (
		<div className='account'>
			<div className='info'>
				<span>{t('Label_Promotion_TurnoverAccumulated')}</span>
				<span>
					{numberFormat(custTurnOver, currencyId)} /{' '}
					{numberFormat(custRollOver, currencyId)}
				</span>
			</div>
			<div className='progressBarModule'>
				<div className='percentage'>{percentage}%</div>
				<div className='bar'>
					<div className='progress' style={{ width: `${percentage}%` }} />
				</div>
				{onSpinButton && (
					<SpinButton
						className='icon icon-spinner11 clickBtn'
						onClick={onSpinButton}
					/>
				)}
			</div>
		</div>
	)
}

export default PromotionProgressBar
