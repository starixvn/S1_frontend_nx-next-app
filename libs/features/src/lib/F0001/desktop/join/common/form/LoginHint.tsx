import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

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
			<h3 className='heading-form'>{t('Label_General_Join')}</h3>
			<div className='slogan-form'>
				{t('Label_Join_LoginMsg', {
					site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
				})}
				<button type='button' onClick={handleOpenLoginModal}>
					{t('Label_Join_LoginHere')}
				</button>
			</div>
		</>
	)
}

export { LoginHint }
