import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'

const MaintenanceModal = ({ onClose }: { onClose: () => void }) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	const handleClose = () => {
		closeModal()
		if (onClose) onClose()
	}
	return (
		<div className='event-lottery-popup maintenance'>
			<div className='popup-content'>
				<div className='maintenance-img'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/lottery/icon-maintenance.png`}
						alt=''
					/>
				</div>
				<div className='title-group'>
					<div className='title'>{t('Label_underMaintenance')}</div>
				</div>
				<button onClick={handleClose}>{t('Label_General_Close')}</button>
			</div>
		</div>
	)
}

export default MaintenanceModal
