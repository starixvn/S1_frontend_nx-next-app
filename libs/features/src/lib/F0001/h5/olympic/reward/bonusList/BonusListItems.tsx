import React from 'react'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import {
	UseOlympicProps,
	useOlympic,
} from '@nx-next-app/features/F0001/providers'
import { useAuth } from '@nx-next-app/data-access'
import RedemptionModal from '../../modal/RedemptionModal'
import { bonusListData } from '../../constants/selectBonus'
import InsufficientModal from '../../modal/InsufficientModal'

const BonusListItems = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId, custId },
	} = useAuth()

	// 按下Redeem之後兌換bonus的功能
	const { handleRedeem } = useOlympic() as UseOlympicProps

	// redeem成功時的彈窗
	const onOpenRedeemSuccessModal = (redeemImg: string, bonusPrice: string) => {
		modal.open(
			<RedemptionModal redeemImg={redeemImg} bonusPrice={bonusPrice} />,
			{ className: 'olympic-medalpop' }
		)
	}

	// 金牌數不足以兌換Bonus的彈窗
	const onOpenRedeemInsufficientModal = () => {
		modal.open(<InsufficientModal />, {
			className: 'olympic-medalpop',
		})
	}

	return (
		<>
			{bonusListData.map(item => {
				const { goldNum, imgUrlMoney, labelBonusGold, redeemImg } = item
				const bonusPrice = t(`${labelBonusGold}_${currencyId}`)
				return (
					<div key={labelBonusGold} className='bouns-item'>
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
									handleRedeem(
										custId,
										goldNum,
										() => onOpenRedeemSuccessModal(redeemImg, bonusPrice),
										() => onOpenRedeemInsufficientModal()
									)
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
