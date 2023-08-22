import { useTranslation } from 'next-i18next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const UnderMaintainModal = () => {
	const { closeModal } = useGlobalModal()
	const { t } = useTranslation()
	return (
		<div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-bell' />
				<div className='title' />
				<div>{t('Label_General_UnderMaintenance')}</div>
				<div className='btnGroup'>
					<button className='btn-cancel' onClick={closeModal}>
						{t('Label_General_Close')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default UnderMaintainModal
