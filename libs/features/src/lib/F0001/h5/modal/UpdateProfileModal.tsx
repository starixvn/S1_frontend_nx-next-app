import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const UpdateProfileModal = ({ prevPage }: { prevPage: string }) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
        <div className='pop'>
			<div className='popTit'>{t('Label_General_ImportantNote')}</div>
			<div className='popTxt'>
				<div>
					{prevPage === paths.withdrawal.root
						? t('Label_General_UpdatePersonalInfoWithdrawal')
						: t('Label_General_UpdatePersonalInfoDeposit')}
				</div>
				<div className='btn-group'>
					<Link href={paths.profile.root} legacyBehavior>
						<button className='btn-check' onClick={closeModal}>
							{t('Label_General_UpdatePersonalDetail')}
						</button>
					</Link>
				</div>
			</div>
		</div>
    );
}

export default UpdateProfileModal
