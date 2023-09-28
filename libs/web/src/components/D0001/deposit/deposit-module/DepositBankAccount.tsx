import { useTranslation } from 'next-i18next'
import { useCopyToClipboard } from 'usehooks-ts'

interface IDepositBankAccountProps {
	bankName: string
	bankHref: string
	accountName: string
	accountNumber: string
	qrCode?: string
}
const DepositBankAccount = ({
	bankName,
	bankHref,
	accountName,
	accountNumber,
	qrCode,
}: IDepositBankAccountProps) => {
	const { t } = useTranslation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()

	return (
		<>
			<div className='bankAccount'>
				{t('Label_Deposit_BankAccountDescription')}
				<div className='smallList'>
					<ul>
						<li>{t('Label_General_BankName')}</li>
						<li>{bankName}</li>
						<li>
							<a
								target='_blank'
								rel='noreferrer'
								href={bankHref}
								className='icon icon-new-tab'
							/>
						</li>
					</ul>
					<ul>
						<li>{t('Label_General_AccountName')}</li>
						<li>{accountName}</li>
						<button
							className='icon icon-files-empty copyBtn'
							onClick={() => copy(accountName)}
						/>
					</ul>
					<ul>
						<li>{t('Label_General_AccountNumber')}</li>
						<li>{accountNumber}</li>
						<button
							className='icon icon-files-empty copyBtn'
							onClick={() => copy(accountNumber)}
						/>
					</ul>
				</div>
			</div>

			{qrCode && (
				<div className='qrCode'>
					<img
						src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}${qrCode}`}
						alt='img-qr-code'
					/>
				</div>
			)}
		</>
	)
}

export default DepositBankAccount
