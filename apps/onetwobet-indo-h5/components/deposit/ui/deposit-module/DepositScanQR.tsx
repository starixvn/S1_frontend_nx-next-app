import { useGlobalData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

interface IDepositScanQRProps {
	qrCode: string
}

const DepositScanQR = ({ qrCode }: IDepositScanQRProps) => {
	const { t } = useTranslation()
	const { getPaymentUrl } = useGlobalData()

	return (
		<>
			<div className='title'>
				<span>*</span>
				{t('Label_Deposit_ScanQR')}
			</div>
			<div className='infoModule'>
				<div className='qrCode'>
					<img src={getPaymentUrl(qrCode)} alt='img-qr-code' />
				</div>
			</div>
		</>
	)
}

export default DepositScanQR
