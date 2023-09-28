import { useAuth } from '@nx-next-app/data-access'
import {
	CustBonusWalletFullFillTypeEnum,
	IPromotionData,
} from '@nx-next-app/service'
import { BonusTypeEnum, PromotionTypeEnum } from '@nx-next-app/types'
import { getExpiryTime, numberFormat } from '@nx-next-app/utils'
import { includes, toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IPromotionRuleProps {
	promotionDetail: IPromotionData
}

const PromotionRule = ({ promotionDetail }: IPromotionRuleProps) => {
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
		`${currencyName} ${numberFormat(value, currencyId, 0)}`

	const expiryTime = getExpiryTime({
		custExpiryTime,
		periodTo,
		t,
	})

	if (tierAmountList.length > 0) {
		const redepositList = tierAmountList.map(tierAmountInfo => (
			<div className='rolloverList'>
				<div>
					<div>{toUpper(t('Label_Promotion_MinDeposit') || '')}</div>
					<div>{numberWithCurrency(tierAmountInfo.requiredAmount)}</div>
				</div>
				<div>
					<div>{toUpper(t('Label_Promotion_Bonus') || '')}</div>
					<div>
						{isPercentage
							? `${tierAmountInfo.bonus}%`
							: numberWithCurrency(tierAmountInfo.bonus)}
					</div>
				</div>
				<div>
					{isPercentage && (
						<>
							<div>{toUpper(t('Label_Promotion_MaxBonus') || '')}</div>
							<div>{numberWithCurrency(tierAmountInfo.maxBonus)}</div>
						</>
					)}
				</div>
				<div>
					<div>
						{fullFillType === CustBonusWalletFullFillTypeEnum.WinOver
							? toUpper(t('Label_General_WinOver') || '')
							: toUpper(t('Label_General_RollOver') || '')}
					</div>
					<div>
						{fullFillType === CustBonusWalletFullFillTypeEnum.WinOver
							? tierAmountInfo.winOver
							: tierAmountInfo.rollOver}
						x
					</div>
				</div>
			</div>
		))

		return (
			<>
				<div className='rolloverList'>
					<div>
						<div className=''>
							{toUpper(t('Label_Promotion_RemainingTime') || '')}
						</div>
						<div>{expiryTime}</div>
					</div>
				</div>

				{redepositList}
			</>
		)
	}

	return (
		<div className='rolloverList'>
			{!includes(
				[PromotionTypeEnum.PromoCode, PromotionTypeEnum.Rebate],
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
					[PromotionTypeEnum.PromoCode, PromotionTypeEnum.Rebate],
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
				<div>
					{fullFillType === CustBonusWalletFullFillTypeEnum.WinOver
						? winOver
						: rollOver}
					x
				</div>
			</div>

			<div>
				<div>{t('Label_Promotion_RemainingTime')}</div>
				<div>{expiryTime}</div>
			</div>
		</div>
	)
}

export default PromotionRule
