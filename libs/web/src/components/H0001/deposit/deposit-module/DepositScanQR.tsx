import { useTranslation } from 'next-i18next'

interface IDepositScanQRProps {
	qrCode: string
}

const DepositScanQR = ({ qrCode }: IDepositScanQRProps) => {
	const { t } = useTranslation()
	return (
		<div className='info infoAccount block-qr-code'>
			<div className='title'>
				{t('Label_Deposit_ScanQR')}
				<span style={{ marginLeft: '5px' }}>*</span>
			</div>
			<div className='infoModule'>
				<div className='qrCode'>
					<img
						src={`${process.env['NEXT_PUBLIC_PAYMENT_MINIO_HOST']}${qrCode}`}
						alt='img-qr-code'
					/>
				</div>
			</div>
		</div>
	)
}

export default DepositScanQR
