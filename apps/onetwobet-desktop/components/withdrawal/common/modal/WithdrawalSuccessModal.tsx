import { useTranslation } from 'next-i18next'

const WithdrawalSuccessModal = ({ onClick }: { onClick: () => void }) => {
	const { t } = useTranslation()
	return (
		<div className='pop'>
			<div className='Cancel active'>
				<div className='icon icon-icon32px_Withdraw' />
				<div className='title'>{t('Label_General_Withdrawal')}</div>
				<div>
					{t('Label_Withdrawal_WithdrawalSuccess')}
					<br />
					{t('Label_Withdrawal_WithdrawalSuccessNotify')}
				</div>
				<div className='btnGroup'>
					<button className='primary' onClick={onClick}>
						OK
					</button>
				</div>
			</div>
		</div>
	)
}

export default WithdrawalSuccessModal
