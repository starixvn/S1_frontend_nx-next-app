import { useGlobalData } from '@nx-next-app/data-access'
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
	const { getPaymentUrl } = useGlobalData()

	const { t } = useTranslation()

	return (
		<>
			<div className='info infoAccount'>
				<ul>
					<li>
						<img
							src={getPaymentUrl(`/square/${toLower(bankLogo)}`)}
							alt='img-bank-logo'
						/>
						<div>{bankName}</div>
					</li>

					<li>
						<div>
							<span>{accountName}</span>
						</div>
						<button
							className='icon icon-files-empty clickBtn copyBtn'
							onClick={() => copy(accountName)}
						/>
					</li>

					<li>
						<div>
							<span>{accountNumber}</span>
						</div>
						<button
							className='icon icon-files-empty clickBtn copyBtn'
							onClick={() => copy(accountNumber)}
						/>
					</li>
				</ul>
			</div>

			{code && (
				<div className='info infoAccount remark'>
					<ul>
						<li className='title'>{t('Label_General_Remark')}</li>
						<li>
							<li>
								<div>
									<span>{code}</span>
								</div>
								<button
									className='icon icon-files-empty clickBtn copyBtn'
									onClick={() => copy(code)}
								/>
							</li>
						</li>
						<div className='tip active'>{t('Label_Deposit_RemarkHint')}</div>
					</ul>
				</div>
			)}
		</>
	)
}

export default DepositBankAccount
