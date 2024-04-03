import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { upperFirst } from 'lodash-es'

const LoginModal = dynamic(() => import('../../../modal/LoginModal'), {
	ssr: false,
})

const LoginHint = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const handleOpenLoginModal = () => {
		modal.open(<LoginModal />)
	}

	return (
		<>
			<span className='title txt-blue'>{t('Label_General_Join')}</span>
			<div>
				{t('Label_Join_LoginMsg', {
					site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
				})}
				<button
					className='txt-blue'
					type='button'
					onClick={handleOpenLoginModal}
				>
					{t('Label_Join_LoginHere')}
				</button>
			</div>
		</>
	)
}

export { LoginHint }
