import { useGlobalModal } from '@nx-next-app/components/config-provider'
import React from 'react'
import { useTranslation } from 'next-i18next'

const InsufficientModal = () => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	return (
		<div className='medalpop active'>
			<div className='medalpop-content'>
				<div className='medalpop-top' />
				<div className='medalpop-item'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/olympic/gold-medal-a.png`}
						alt='Insufficient medal'
					/>
					<div>{t('Label_Olympic_Gold_Medal')}</div>
					<div>{t('Label_Olympic_Insufficient')}</div>
					<button onClick={closeModal}>{t('Label_General_Close')}</button>
				</div>
			</div>
		</div>
	)
}

export default InsufficientModal
