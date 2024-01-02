import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import Link from 'next/link'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

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
						className='btn-cancel'
						onClick={() => {
							closeModal()
							closeCallback()
						}}
					>
						{t('Label_Profile_Later')}
					</button>
					<Link href={`${paths.deposit.root}`} passHref>
						<a className='btn-check' onClick={closeModal}>
							{t('Label_Profile_DepositNow')}
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default DepositHintModal
