import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	WithdrawalBankCardEnum,
	type ISelectedBankInfo,
} from '@nx-next-app/operations'
import { isConvert, numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

export interface IWithdrawalConfirmModalProps {
	selectedBankInfo: ISelectedBankInfo
	withdrawalAmount: number
	accountName: string
	exchangeAmount: number
	handleWithdrawalConfirm: () => void
}

const WithdrawalConfirmModal = ({
	selectedBankInfo,
	withdrawalAmount,
	accountName,
	exchangeAmount,
	handleWithdrawalConfirm,
}: IWithdrawalConfirmModalProps) => {
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
					<button className='gray' onClick={closeModal}>
						{t('Label_General_Cancel')}
					</button>
					<button className='primary' onClick={handleWithdrawalConfirm}>
						{t('Label_General_Submit')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default WithdrawalConfirmModal
