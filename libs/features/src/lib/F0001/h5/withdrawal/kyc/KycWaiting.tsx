import { WrapperWithdrawalH5 } from '@nx-next-app/features/F0001/h5/withdrawal/styles'
import { useTranslation } from 'next-i18next'

const KycWaiting = () => {
	const { t } = useTranslation()
	return (
		<WrapperWithdrawalH5>
			<div className='header header-waiting'>
				<div className='title'>{t('Label_Withdrawal_WaitKYC')}</div>
			</div>
			<main className='main kyc'>
				<div className='icon-noti'>
					<i className='icon icon-timelapse' />
				</div>
				<div className='kyc-text title'>{t('Label_Withdrawal_WaitKYC')}</div>
				<div className='kyc-text'>{t('Label_Withdrawal_WaitKYCHint')}</div>
			</main>
		</WrapperWithdrawalH5>
	)
}
export default KycWaiting
