import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const RegionCloseRegisterModal = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className='pop'>
			<div className='popTit'>{t('Label_General_Information')}</div>
			<div className='popTxt'>
				<div>{t('Label_Close_Region_Register_Notice')}</div>
				<div className='btn-group'>
					<button
						type='button'
						className='blue'
						onClick={() => {
							closeModal()
							router.push(paths.home.root)
						}}
					>
						{t('Label_General_OK')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default RegionCloseRegisterModal
