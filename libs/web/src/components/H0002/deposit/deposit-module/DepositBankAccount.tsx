import { toLower } from 'lodash-es'
import { useCopyToClipboard } from 'usehooks-ts'

interface IDepositBankAccountProps {
	bankName: string

	accountName: string
	accountNumber: string
	bankLogo?: string
}
const DepositBankAccount = ({
	bankName,

	accountName,
	accountNumber,
	bankLogo,
}: IDepositBankAccountProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, copy] = useCopyToClipboard()

	return (
		<div className='info infoAccount'>
			<ul>
				<li>
					<img
						src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/square/${toLower(
							bankLogo
						)}`}
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
	)
}

export default DepositBankAccount
