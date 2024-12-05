import { toLower } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useCopyToClipboard } from 'usehooks-ts'

interface IDepositBankAccountProps {
	bankName: string
	accountName: string
	accountNumber: string
	bankLogo?: string
	code: string | null
}
const DepositBankAccount = ({
	bankName,
	accountName,
	accountNumber,
	bankLogo,
	code,
}: IDepositBankAccountProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()
	const { t } = useTranslation()

	return (
		<>
			<div className='info infoAccount'>
				<ul>
					<li className='selected-bank'>
						<img
							src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/square/${toLower(
								bankLogo
							)}`}
							alt='img-bank-logo'
						/>
						<div>{bankName}</div>
					</li>

					<li className='input-type'>
						<div>
							<span>{accountName}</span>
						</div>
						<button
							className='icon icon-file-copy-line clickBtn copyBtn'
							onClick={() => copy(accountName)}
						/>
					</li>

					<li className='input-type'>
						<div>
							<span>{accountNumber}</span>
						</div>
						<button
							className='icon icon-file-copy-line clickBtn copyBtn'
							onClick={() => copy(accountNumber)}
						/>
					</li>
				</ul>
			</div>
			{code && (
				<div className='info infoAccount remark'>
					<ul>
						<li className='title'>{t('Label_General_Remark')}</li>
						<li className='input-type'>
							<div>
								<span>{code}</span>
							</div>
							<button
								className='icon icon-file-copy-line clickBtn copyBtn'
								onClick={() => copy(code)}
							/>
						</li>
						<div className='tip active'>{t('Label_Deposit_RemarkHint')}</div>
					</ul>
				</div>
			)}
		</>
	)
}

export default DepositBankAccount
