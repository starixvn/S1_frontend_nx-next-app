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

	// TODO: 待後端完成api後，實作按下Redeem之後兌換bonus的功能

	// redeem成功時的彈窗
	const onOpenRedeemModal = (redeemImg: string, bonusPrice: string) => {
		modal.open(
			<RedemptionModal redeemImg={redeemImg} bonusPrice={bonusPrice} />,
			{ className: 'olympic-medalpop' }
		)
	}

	return (
		<>
			{bonusListData.map(item => {
				const { goldNum, imgUrlMoney, labelBonusGold, redeemImg } = item
				const bonusPrice = t(`${labelBonusGold}_${currencyId}`)
				return (
					<div className='bouns-item'>
						<div>
							<img src={imgUrlMoney} alt='' />
							<div>{t(bonusPrice)}</div>
						</div>
						<div>
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
