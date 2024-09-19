import { useTranslation } from 'next-i18next'
import Header from '../../header'

const KycWaiting = () => {
	const { t } = useTranslation()
	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_Withdrawal_WaitKYC')}</div>
			</Header>
			<main className='main kyc'>
				<div className='icon icon-jump' />
				<div className='text-center'>{t('Label_Withdrawal_WaitKYC')}</div>
				<div className='text-center'>{t('Label_Withdrawal_WaitKYCHint')}</div>
			</main>
		</>
	)
}
export default KycWaiting
