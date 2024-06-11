import React from 'react'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import RedemptionModal from '../../modal/RedemptionModal'
import { bonusListData } from '../../constants/selectBonus'

interface IBonusListItemsProps {
	currencyId: number
}

const BonusListItems = ({ currencyId }: IBonusListItemsProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	// redeem成功時的彈窗
	const onOpenRedeemModal = (redeemImg: string, bonusPrice: string) => {
		modal.open(
			<RedemptionModal redeemImg={redeemImg} bonusPrice={bonusPrice} />,
			{
				className: 'olympic-medalpop',
			}
		)
	}

	return (
		<>
			{bonusListData.map(item => {
				const { goldNum, imgUrlMoney, labelBonusGold, redeemImg } = item
				const bonusPrice = t(`${labelBonusGold}_${currencyId}`)
				return (
					<div className='bouns-content-item'>
						<div className='money'>
							<img src={imgUrlMoney} alt='gold pic' />
							<div>{t(bonusPrice)}</div>
						</div>
						<div className='redeem-btn'>
							<div>
								{goldNum} {t('Label_Olympic_Gold_Medal')}
							</div>
							<button
								onClick={() => {
									onOpenRedeemModal(redeemImg, bonusPrice)
								}}
							>
								{t('Label_General_Redeem')}
							</button>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default BonusListItems
