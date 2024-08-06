/* eslint-disable react/self-closing-comp */
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
			{/* todo 通知設計這個線是從 changepassword 搬來 */}
			<div className='bottom-line'></div>
			<div className='setting-subtitle'>Connect to Social Login</div>
			<div className='social'>
				<div className='social-icon'>
					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/line-color.svg`}
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
