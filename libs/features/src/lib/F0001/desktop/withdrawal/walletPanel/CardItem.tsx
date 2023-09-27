import { IBankInfoData, IEWalletData } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	WithdrawalBankCardEnum,
	WithdrawalPanelStatusEnum,
} from '@nx-next-app/features/F0001/types'
import { useTranslation } from 'next-i18next'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { useAuth } from '@nx-next-app/data-access'

const CardItem = ({
	item,
	type,
}: {
	item: IBankInfoData | IEWalletData
	type: WithdrawalBankCardEnum
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const {
		selectedBankInfo,
		withdrawalStatus,
		accountName,
		handleDeleteBankCard,
		handleDeleteEWalletCard,
		handleSelectCard,
	} = useWithdrawal()

	const { accountNo = '', sysId } = item

	// 這兩個參數名稱叫不一樣，可是用法一模壹樣
	const rawBankLogo =
		(item as IBankInfoData)?.bankLogo ?? (item as IEWalletData)?.eWalletLogo
	const bankName =
		(item as IBankInfoData)?.bankName ?? (item as IEWalletData)?.eWalletName

	const { ifscCode } = item as IBankInfoData

	const checked =
		accountNo === selectedBankInfo.accountNo &&
		bankName === selectedBankInfo.bankName

	const bankLogo = String(rawBankLogo).toLowerCase()
	return (
		<div className='addBankName' key={`${accountNo}-${sysId}`}>
			<div className='addBankInfo'>
				<div className='bankName'>
					<img
						src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/square/${bankLogo}`}
						alt=''
					/>

					<div>
						{bankName}
						<div className='txt-blue'>
							<span>{accountNo.slice(0, 4)}</span>
							<span>{accountNo.slice(4, 8)}</span>
							<span>{accountNo.slice(8, 12)}</span>
							<span>{accountNo.slice(12, 16)}</span>
						</div>
						{/* INR 才顯示這個不確定未來會不會新增，先這樣寫 */}
						{currencyId === CurrenciesEnum.INR &&
							type === WithdrawalBankCardEnum.LocalBank && (
								<div className='txt-gray'>
									<span>
										{t('Label_Withdrawal_IFSCCode')}:{ifscCode ?? ''}
									</span>
								</div>
							)}
					</div>
				</div>
				<div className='checkbox'>
					<input
						type='checkbox'
						id={accountNo}
						onChange={() => {
							handleSelectCard({
								bankName,
								accountNo,
								sysId,
								ifscCode,
								type,
							})
						}}
						checked={checked}
					/>
					<label htmlFor={accountNo} className='icon icon-checkbox-checked' />
				</div>
			</div>
			{withdrawalStatus === WithdrawalPanelStatusEnum.Confirm ? null : (
				<button
					className='icon icon-bin'
					onClick={() => {
						if (type === WithdrawalBankCardEnum.LocalBank) {
							handleDeleteBankCard({ accountNo, accountName, sysId })
						} else {
							handleDeleteEWalletCard({ accountNo, sysId })
						}
					}}
				/>
			)}
		</div>
	)
}

export { CardItem }
