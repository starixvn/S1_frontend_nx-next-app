import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'

const LiveStreamingModal = () => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className='pop'>
			<div className='popTit'>
				<div
					className='close-popup icon icon-close-line'
					onClick={closeModal}
				/>
				{t('Label_General_Information')}
			</div>
			<div className='popTxt'>
				<div style={{ color: 'red' }}>
					{t('Label_InaccessibleWithoutPermission')}
				</div>
			</div>
		</div>
	)
}

export default LiveStreamingModal
