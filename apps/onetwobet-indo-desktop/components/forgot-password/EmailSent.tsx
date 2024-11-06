import { useTranslation } from 'next-i18next'

const EmailSent = ({ onBack }: { onBack?: () => void }) => {
	const { t } = useTranslation()
	return (
		<div className='form-content'>
			<div className='inputModule'>
				<div className='title'>{t('Label_ResetPassword')}</div>
				<p>{t('Label_General_ForgotPwdMailSent')}</p>
				{onBack && (
					<a onClick={onBack}>
						<i className='icon icon-keyboard_arrow_left' />
						{t('Label_General_Back')}
					</a>
				)}
			</div>
		</div>
	)
}

export default EmailSent
