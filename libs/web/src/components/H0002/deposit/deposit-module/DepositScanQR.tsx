import { useTranslation } from 'next-i18next'

interface IDepositScanQRProps {
	qrCode: string
}

const DepositScanQR = ({ qrCode }: IDepositScanQRProps) => {
	const { t } = useTranslation()
	return (
		<>
			<div className='title'>
				<span>*</span>
				{t('Label_Deposit_ScanQR')}
			</div>
			<div className='infoModule'>
				<div className='qrCode'>
					<img
						src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}${qrCode}`}
						alt='img-qr-code'
					/>
				</div>
			</div>
		</>
	)
}

export default DepositScanQR
