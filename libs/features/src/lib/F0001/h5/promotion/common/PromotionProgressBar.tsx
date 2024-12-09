import { SpinButton } from "@nx-next-app/components/H0001";
import { useAuth } from "@nx-next-app/data-access";
import { getPromotionPercentage, numberFormat } from "@nx-next-app/utils";
import { useTranslation } from "next-i18next";

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
				<div className='info-title'>
					{t('Label_Promotion_TurnoverAccumulated')}
				</div>
				<div className='info-value'>
					{numberFormat(custTurnOver, currencyId)} /{' '}
					{numberFormat(custRollOver, currencyId)}
				</div>
			</div>
			{onSpinButton && (
				<SpinButton
					className='icon icon-refresh-fill clickBtn'
					onClick={onSpinButton}
				/>
			)}
			<div className='progressBarModule'>
				<div className='bar'>
					<div className='progress' style={{ width: `${percentage}%` }} />
				</div>
				<div className='percentage'>{percentage}%</div>
			</div>
		</div>
	)
}

export default PromotionProgressBar
