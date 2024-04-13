import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'

const UpdateProfileModal = ({ prevPage }: { prevPage: string }) => {
	const { t } = useTranslation()
	return (
        <div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-icon32px_Profile' />
				<div className='title'>{t('Label_General_ImportantNote')}</div>
				<div>{t('Label_General_UpdatePersonalInfoWithdrawal')}</div>
				<div className='btnGroup'>
					<Link
                        href={{ pathname: paths.profile.root, query: { prevPage } }}
                        legacyBehavior>
						<button className='btn-check'>
							{t('Label_General_UpdatePersonalDetail')}
						</button>
					</Link>
				</div>
			</div>
		</div>
    );
}

export default UpdateProfileModal
