import { useTranslation } from 'next-i18next'
import { ISelectedBankInfo } from '@nx-next-app/features/F0001/providers'
import { useAuth } from '@nx-next-app/data-access'
import { isConvert, numberFormat } from '@nx-next-app/utils'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const WithdrawalConfirmModal = ({
	selectedBankInfo,
	withdrawalAmount,
	handleCancelSubmit,
	accountName,
	exchangeAmount,
	handleWithdrawalConfirm,
}: {
	selectedBankInfo: ISelectedBankInfo
	withdrawalAmount: number
	handleCancelSubmit: () => void
	accountName: string
	exchangeAmount: number
	handleWithdrawalConfirm: () => void
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { closeModal } = useGlobalModal()

	const converted = isConvert(currencyId)
	const displayAmount = numberFormat(
		converted ? withdrawalAmount * 1000 : withdrawalAmount,
		currencyId
	)

	const {
		usdtAddress,
		bankName,
		accountNo,
		ifscCode,
		nickName,
		currencyName,
		type,
	} = selectedBankInfo

	return (
		<div className='pop'>
			<div className='popTit'>
				<div className='icon icon-close' onClick={closeModal} />
				{t('Label_General_ImportantNote')}
			</div>
			<div className='popTxt'>
				<ul>
					{type !== WithdrawalBankCardEnum.Crypto ? (
						<>
							<li className='text-org'>{t('Label_Withdrawal_WithdrawalTo')}</li>
							<li>{bankName}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_BankAccountName')}
							</li>
							<li>{accountName}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_AccountNumber')}
							</li>
							<li>{accountNo}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_WithdrawalAmount')}
							</li>
							<li>{displayAmount}</li>
							{ifscCode && (
								<>
									<li className='text-org'>{t('Label_Withdrawal_IFSCCode')}</li>
									<li>{ifscCode ?? ''}</li>
								</>
							)}
						</>
					) : (
						<>
							<li className='text-org'>{t('Label_Withdrawal_WithdrawalTo')}</li>
							<li>{nickName}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_CryptoWalletAddress')}
							</li>
							<li>{usdtAddress}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_WithdrawalAmount')}
							</li>
							<li>{displayAmount}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_ReceiveUSDT', {
									currencyName,
								})}
							</li>
							<li>{exchangeAmount}</li>
							<li className='text-org'>
								{t('Label_Withdrawal_WithdrawalCryptoNote')}
							</li>
						</>
					)}
				</ul>
				<div className='btn-group'>
					<button className='white' onClick={handleCancelSubmit}>
						{t('Label_General_Cancel')}
					</button>
					<button className='orange' onClick={handleWithdrawalConfirm}>
						{t('Label_General_Submit')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default WithdrawalConfirmModal
