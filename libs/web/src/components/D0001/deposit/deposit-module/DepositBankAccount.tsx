import { useTranslation } from 'next-i18next'
import { useCopyToClipboard } from 'usehooks-ts'

interface IDepositBankAccountProps {
	bankName: string
	bankHref: string
	accountName: string
	accountNumber: string
	code: string | null
	qrCode?: string
}

const DepositBankAccount = ({
	bankName,
	bankHref,
	accountName,
	accountNumber,
	code,
	qrCode,
}: IDepositBankAccountProps) => {
	const { t } = useTranslation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()

	return (
		<>
			<div className='bankAccount'>
				<div className='heading'>
					{t('Label_Deposit_BankAccountDescription')}
				</div>
				<div className='smallList'>
					<ul>
						<li>{t('Label_General_BankName')}</li>
						<li>{bankName}</li>
						<a
							target='_blank'
							rel='noreferrer'
							href={bankHref}
							className='icon icon-share-box-fill'
						/>
					</ul>
					<ul>
						<li>{t('Label_General_AccountName')}</li>
						<li>{accountName}</li>
						<button
							className='icon icon-file-copy-line copyBtn'
							onClick={() => copy(accountName)}
						/>
					</ul>
					<ul>
						<li>{t('Label_General_AccountNumber')}</li>
						<li>{accountNumber}</li>
						<button
							className='icon icon-file-copy-line copyBtn'
							onClick={() => copy(accountNumber)}
						/>
					</ul>
					{code && (
						<ul className='remark'>
							<li>{t('Label_General_Remark')}</li>
							<li>{code}</li>
							<button
								className='icon icon-file-copy-line copyBtn'
								onClick={() => copy(code)}
							/>
						</ul>
					)}
				</div>
			</div>

			{qrCode && (
				<div className='qrCode' style={{ marginTop: '1.2rem' }}>
					<img
						src={`${process.env['NEXT_PUBLIC_PAYMENT_MINIO_HOST']}${qrCode}`}
						alt='img-qr-code'
					/>
				</div>
			)}
		</>
	)
}

export default DepositBankAccount
