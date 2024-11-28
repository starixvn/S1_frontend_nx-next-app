import { useTranslation } from 'next-i18next'

const WithdrawalSuccessModal = ({ onClick }: { onClick: () => void }) => {
	const { t } = useTranslation()
	return (
		<div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-notifi icon-notification-active' />
				<div className='title'>{t('Label_General_Withdrawal')}</div>
				<div>
					{t('Label_Withdrawal_WithdrawalSuccess')}
					<br />
					{t('Label_Withdrawal_WithdrawalSuccessNotify')}
				</div>
				<div className='btnGroup'>
					<button className='btn-primary' onClick={onClick}>
						OK
					</button>
				</div>
			</div>
			<i className='close-popup icon-close-line' onClick={onClick} />
		</div>
	)
}

export default WithdrawalSuccessModal
