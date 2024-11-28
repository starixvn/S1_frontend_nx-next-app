import { useAuth } from '@nx-next-app/data-access'
import {
	CustBonusWalletFullFillTypeEnum,
	IPromotionData,
} from '@nx-next-app/service'
import { BonusTypeEnum, PromotionTypeEnum } from '@nx-next-app/types'
import { getExpiryTime, numberFormat } from '@nx-next-app/utils'
import { includes, toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IPromoRuleProps {
	promotionDetail: IPromotionData
}

const PromoRule = ({ promotionDetail }: IPromoRuleProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId, currencyName },
	} = useAuth()
	const {
		bonus,
		bonusType,
		maxBonus,
		rollOver,
		winOver,
		promotionType,
		requiredAmount,
		fullFillType,
		tierAmountList,
		custExpiryTime,
		periodTo,
	} = promotionDetail

	const isPercentage = bonusType === BonusTypeEnum.Percentage

	const numberWithCurrency = (value: number) =>
		`${currencyName} ${numberFormat(value, currencyId)}`

	const expiryTime = getExpiryTime({
		custExpiryTime,
		periodTo,
		t,
	})

	if (tierAmountList.length > 0) {
		const redepositList = tierAmountList.map(tierAmountInfo => (
			<div className='custom-td' key={tierAmountInfo.requiredAmount}>
				<div className='td'>
					{numberWithCurrency(tierAmountInfo.requiredAmount)}
				</div>
				<div className='td'>
					{isPercentage
						? `${tierAmountInfo.bonus}%`
						: numberWithCurrency(tierAmountInfo.bonus)}
				</div>
				{isPercentage && (
					<div className='td'>
						{numberWithCurrency(tierAmountInfo.maxBonus)}
					</div>
				)}
				<div className='td'>
					{fullFillType === CustBonusWalletFullFillTypeEnum.WinOver
						? tierAmountInfo.winOver
						: tierAmountInfo.rollOver}
					x
				</div>
			</div>
		))

		return (
			<>
				<div className='remainingTime custom-table'>
					<div className='expiryTime-title custom-table-thead'>
						<div className='custom-th'>
							{t('Label_Promotion_RemainingTime')}
						</div>
					</div>
					<div className='expiryTime-body custom-table-tbody'>
						<div className='custom-td'>
							<div className='td'>{expiryTime}</div>
						</div>
					</div>
				</div>
				<div className='rolloverListNew custom-table'>
					<div className='custom-table-thead'>
						<div className='custom-th'>{t('Label_Promotion_MinDeposit')}</div>
						<div className='custom-th'>
							{t('Label_Promotion_Bonus').toUpperCase()}
						</div>
						{isPercentage && <div>{t('Label_Promotion_MaxBonus')}</div>}
						<div className='custom-th'>
							{fullFillType === CustBonusWalletFullFillTypeEnum.WinOver
								? t('Label_General_WinOver')
								: t('Label_General_RollOver')}
						</div>
					</div>
					<div className='custom-table-tbody'>{redepositList}</div>
				</div>
			</>
		)
	}

	return (
		<div className='rolloverList'>
			{!includes(
				[PromotionTypeEnum.SpecialBonus, PromotionTypeEnum.Rebate],
				promotionType
			) && (
				<>
					{requiredAmount > 0 && (
						<div>
							<div>{toUpper(t('Label_Promotion_MinDeposit') || '')}</div>
							<div>{numberWithCurrency(requiredAmount)}</div>
						</div>
					)}
					<div>
						<div>{toUpper(t('Label_Promotion_Bonus') || '')}</div>
						<div>{isPercentage ? `${bonus}%` : numberWithCurrency(bonus)}</div>
					</div>
				</>
			)}

			{isPercentage &&
				!includes(
					[PromotionTypeEnum.SpecialBonus, PromotionTypeEnum.Rebate],
					promotionType
				) && (
					<div>
						<div>{toUpper(t('Label_Promotion_MaxBonus') || '')}</div>
						<div>{numberWithCurrency(maxBonus)}</div>
					</div>
				)}

			<div>
				<div>
					{fullFillType === CustBonusWalletFullFillTypeEnum.WinOver
						? t('Label_General_WinOver')
						: t('Label_General_RollOver')}
				</div>
				<div>{fullFillType === 2 ? winOver : rollOver}x</div>
			</div>

			<div>
				<div>{t('Label_Promotion_RemainingTime')}</div>
				<div>{expiryTime}</div>
			</div>
		</div>
	)
}

export default PromoRule
