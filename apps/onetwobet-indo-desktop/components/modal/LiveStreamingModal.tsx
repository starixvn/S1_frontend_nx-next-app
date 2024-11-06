import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'

const LiveStreamingModal = () => {
	const { closeModal } = useGlobalModal()
	const { t } = useTranslation()
	return (
		<div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-bell' />
				<div className='title'>{t('Label_General_Information')}</div>
				<div style={{ color: 'red' }}>
					{t('Label_InaccessibleWithoutPermission')}
				</div>
				<div className='btnGroup'>
					<button className='btn-cancel' onClick={closeModal}>
						{t('Label_General_Close')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default LiveStreamingModal
