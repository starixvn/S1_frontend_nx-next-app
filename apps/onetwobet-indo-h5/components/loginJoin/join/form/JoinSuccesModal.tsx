import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const JoinSuccessModal = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const { closeModal } = useGlobalModal()
	const router = useRouter()
	return (
		<div className='joinSuccess'>
			<div className='logo'>
				<img alt='logo' src={getBannerUrl('/h5/img/logo.png')} />
			</div>
			<div className='Join'>
				<div className='Terms'>{t('Label_Join_AfterJoinHint')}</div>
				<div className='btn-group'>
					<button
						onClick={() => {
							closeModal()
							router.push(paths.deposit.root)
						}}
						className='primary'
						style={{ textTransform: 'uppercase' }}
					>
						{t('Label_Join_DepositNow')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default JoinSuccessModal
