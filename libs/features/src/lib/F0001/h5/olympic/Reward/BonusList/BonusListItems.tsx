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

// <div className='bouns-content-item'>
// 	<div className='money'>
// 		<img
// 			src='https://banner.0814media.net/desktop/img/event/olympic/gold-a.png'
// 			alt=''
// 		/>
// 		<div>{t(`Label_Olympic_Bonus_3Gold_${currencyId}`)}</div>
// 	</div>
// 	<div className='redeem-btn'>
// 		<div>3 {t('Label_Olympic_Gold_Medal')}</div>
// 		{/* <button onClick={onOpenRedeemModal}> */}
// 		<button>{t('Label_General_Redeem')}</button>
// 	</div>
// </div>
// <div className='bouns-content-item'>
// 	<div className='money'>
// 		<img
// 			src='https://banner.0814media.net/desktop/img/event/olympic/gold-b.png'
// 			alt=''
// 		/>
// 		<div>{t(`Label_Olympic_Bonus_5Gold_${currencyId}`)}</div>
// 	</div>
// 	<div className='redeem-btn'>
// 		<div>5 {t('Label_Olympic_Gold_Medal')}</div>
// 		<button>{t('Label_General_Redeem')}</button>
// 	</div>
// </div>
// <div className='bouns-content-item'>
// 	<div className='money'>
// 		<img
// 			src='https://banner.0814media.net/desktop/img/event/olympic/gold-c.png'
// 			alt=''
// 		/>
// 		<div>{t(`Label_Olympic_Bonus_8Gold_${currencyId}`)}</div>
// 	</div>
// 	<div className='redeem-btn'>
// 		<div>8 {t('Label_Olympic_Gold_Medal')}</div>
// 		<button>{t('Label_General_Redeem')}</button>
// 	</div>
// </div>
