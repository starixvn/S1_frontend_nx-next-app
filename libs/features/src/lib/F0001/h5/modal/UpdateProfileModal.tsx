import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const UpdateProfileModal = ({ prevPage }: { prevPage: string }) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className='pop'>
			<i className='icon icon-notifi icon-notification-active' />
			<div className='popTit'>{t('Label_General_ImportantNote')}</div>
			<i className='close-popup icon icon-close-line' onClick={closeModal} />
			<div className='popTxt'>
				<div>
					{prevPage === paths.withdrawal.root
						? t('Label_General_UpdatePersonalInfoWithdrawal')
						: t('Label_General_UpdatePersonalInfoDeposit')}
				</div>

				<div className='btnGroup'>
					<Link href={paths.profile.root}>
						<button className='btn-primary' onClick={closeModal}>
							{t('Label_General_UpdatePersonalDetail')}
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default UpdateProfileModal
