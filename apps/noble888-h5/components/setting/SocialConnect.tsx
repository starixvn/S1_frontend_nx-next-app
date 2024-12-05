import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useVerification } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const SocialConnect = () => {
	const { t } = useTranslation()
	const { isLineBinding, handleLineBinding } = useVerification()
	const { modal } = useGlobalModal()

	// ====== 函數 ======

	/** 提交過程中發生錯誤時，顯示錯誤訊息 */
	const showErrorModal = (message: string) => modal.error(message)

	return (
		<div className='setting-container'>
			<div className='bottom-line' />
			<div className='setting-title'>{t('Label_General_ConnectSocial')}</div>
			<div className='connect-social'>
				<div className='social-icon'>
					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/line-color.svg`}
							alt='Line'
						/>
						<span>{t('Label_General_LinePay')}</span>
					</div>
					<button
						className={classNames({ active: isLineBinding })}
						onClick={() => {
							handleLineBinding(showErrorModal)
						}}
					>
						{isLineBinding
							? t('Label_Profile_Connected')
							: t('Label_Profile_Connect')}
					</button>
				</div>
			</div>
		</div>
	)
}

export { SocialConnect }
