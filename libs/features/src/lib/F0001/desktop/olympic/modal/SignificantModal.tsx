import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'
import React from 'react'

const SignificantModal = () => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className='rulepop'>
			<div className='rulepop-content'>
				<div className='rulepop-title'>
					{t('Label_Olympic_Significant_Condition')}
				</div>
				<div className='rulepop-text'>
					<ul>
						<li>{t('Label_Olympic_Significant_Condition_a')}</li>
						<li>{t('Label_Olympic_Significant_Condition_b')}</li>
						<li>{t('Label_Olympic_Significant_Condition_c')}</li>
						<li>{t('Label_Olympic_Significant_Condition_d')}</li>
						<li>{t('Label_Olympic_Significant_Condition_e')}</li>
						<li>{t('Label_Olympic_Significant_Condition_f')}</li>
						<li>{t('Label_Olympic_Significant_Condition_g')}</li>
					</ul>
				</div>
				<div className='close-btn'>
					<button onClick={closeModal}>{t('Label_General_Close')}</button>
				</div>
			</div>
		</div>
	)
}

export default SignificantModal
