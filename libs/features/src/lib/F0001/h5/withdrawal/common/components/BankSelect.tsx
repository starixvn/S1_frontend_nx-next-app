import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { CurrenciesEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const BankSelect = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { withdrawalType, bankData, selectedBankInfo, handleSelectCard } =
		useWithdrawal()
	const { bankInfoDetail, custEWalletInfo } = bankData
	const showIFSC =
		currencyId === CurrenciesEnum.INR &&
		withdrawalType === WithdrawalBankCardEnum.LocalBank

	const addCardIcon = (() => {
		switch (withdrawalType) {
			case WithdrawalBankCardEnum.LocalBank:
				return bankInfoDetail?.length < 3 ? (
					<Link href={paths.bankInfo.root}>
						<a />
					</Link>
				) : null
			case WithdrawalBankCardEnum.EWallet:
				return custEWalletInfo?.length < 3 ? (
					<Link href={paths.eWallet.root}>
						<a />
					</Link>
				) : null
			default:
				return null
		}
	})()

	const banksIcon = (() => {
		switch (withdrawalType) {
			case WithdrawalBankCardEnum.LocalBank:
				return bankInfoDetail.map(info => {
					const { sysId, accountNo, bankName, bankLogo, ifscCode, disabled } =
						info
					const selected =
						selectedBankInfo?.sysId === sysId &&
						selectedBankInfo?.accountNo === accountNo

					return (
						<button
							disabled={disabled}
							className={classNames({ active: selected, pending: disabled })}
							key={`${info.sysId}-${info.accountNo}`}
							onClick={() =>
								handleSelectCard({
									bankName,
									accountNo,
									sysId,
									ifscCode,
									type: withdrawalType,
								})
							}
						>
							{disabled && (
								<div className='mask'>
									{t('Label_General_UnderMaintenance')}
								</div>
							)}

							<img
								src={`${
									process.env['NEXT_PUBLIC_PAYMENT_HOST']
								}/square/${bankLogo.toLowerCase()}`}
								alt={bankName}
							/>
						</button>
					)
				})
			case WithdrawalBankCardEnum.EWallet:
				return custEWalletInfo.map(info => {
					const { sysId, accountNo, eWalletName, eWalletLogo } = info
					const selected =
						selectedBankInfo?.sysId === sysId &&
						selectedBankInfo?.accountNo === accountNo
					return (
						<button
							className={classNames({ active: selected })}
							key={`${sysId}-${accountNo}`}
							data-testid='bank-icon'
							onClick={() =>
								handleSelectCard({
									bankName: eWalletName,
									accountNo,
									sysId,
									type: withdrawalType,
								})
							}
						>
							<img
								src={`${
									process.env['NEXT_PUBLIC_PAYMENT_HOST']
								}/square/${eWalletLogo.toLowerCase()}`}
								alt={eWalletName}
							/>
						</button>
					)
				})
			default:
				return null
		}
	})()

	return (
		<>
			<div className='selectBank'>
				{banksIcon}
				{addCardIcon}
			</div>
			{withdrawalType === WithdrawalBankCardEnum.EWallet && (
				<div className='text'>{t('Label_Withdrawal_EWalletSubmitNote')}</div>
			)}
			{showIFSC && (
				<div className='ifsc'>
					{t('Label_BankInfo_IFSCCode')}:
					<span>{selectedBankInfo?.ifscCode}</span>
				</div>
			)}
		</>
	)
}

export { BankSelect }
