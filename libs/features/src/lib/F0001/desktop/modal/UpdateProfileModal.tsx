import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const UpdateProfileModal = ({ prevPage }: { prevPage: string }) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-notifi icon-notification-active' />
				<div className='title'>{t('Label_General_ImportantNote')}</div>
				<div className='error-content'>
					{prevPage === paths.withdrawal.root
						? t('Label_General_UpdatePersonalInfoWithdrawal')
						: t('Label_General_UpdatePersonalInfoDeposit')}
				</div>
				<div className='btnGroup'>
					<Link href={{ pathname: paths.profile.root, query: { prevPage } }}>
						<button className='btn-primary' onClick={closeModal}>
							{t('Label_General_UpdatePersonalDetail')}
						</button>
					</Link>
				</div>
			</div>
			<i className='close-popup icon-close-line' onClick={closeModal} />
		</div>
	)
}

export default UpdateProfileModal
