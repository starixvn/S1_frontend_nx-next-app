import React from 'react'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'

interface IRedemptionModalProps {
	redeemImg: string
	bonusPrice: string
}

const RedemptionModal = ({ redeemImg, bonusPrice }: IRedemptionModalProps) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className={`medalpop ${redeemImg} active`}>
			<div className='medalpop-content'>
				<div className='medalpop-top' />
				<div className='medalpop-item'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/olympic/${redeemImg}.png`}
						alt={redeemImg}
					/>
					<div>{bonusPrice}</div>
					<div>{t('Label_Olympic_Redemption_Successful')}</div>
					<button onClick={closeModal}>{t('Label_General_Redeem')}</button>
				</div>
			</div>
		</div>
	)
}

export default RedemptionModal
