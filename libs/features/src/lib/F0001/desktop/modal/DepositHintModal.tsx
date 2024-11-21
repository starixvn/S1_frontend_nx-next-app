import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const DepositHintModal = ({
	closeCallback = () => null,
}: {
	closeCallback?: () => void
}) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()
	return (
		<div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-bell' />
				<div className='title'>{t('Label_General_Information')}</div>
				<div>{t('Label_DepositHint')}</div>
				<div className='btnGroup'>
					<button
						className='btn-secondary'
						onClick={() => {
							closeModal()
							closeCallback()
						}}
					>
						{t('Label_Profile_Later')}
					</button>
					<Link href={`${paths.deposit.root}`} passHref>
						<a className='btn-primary' onClick={closeModal}>
							{t('Label_Profile_DepositNow')}
						</a>
					</Link>
				</div>
				<i className='close-popup icon-close-line' onClick={closeModal} />
			</div>
		</div>
	)
}

export default DepositHintModal
