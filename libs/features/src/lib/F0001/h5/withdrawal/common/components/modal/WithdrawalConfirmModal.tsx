import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperWithDrawalH5 } from '@nx-next-app/features/F0001/h5/withdrawal/common/components/modal/styles'
import { ISelectedBankInfo } from '@nx-next-app/features/F0001/providers'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import { isConvert, numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

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
			<WrapperWithDrawalH5>
				<div className='popTit'>
					<div
						className='icon icon-notifi icon-notification-active'
						style={{ margin: '4vw auto' }}
					/>
					<div
						className='close-popup icon icon-close-line'
						onClick={closeModal}
					/>
					<div className='heading'>{t('Label_General_ImportantNote')}</div>
				</div>
				<div className='popTxt'>
					<ul>
						{type !== WithdrawalBankCardEnum.Crypto ? (
							<>
								<li className='text-org'>
									{t('Label_Withdrawal_WithdrawalTo')}
								</li>
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
										<li className='text-org'>
											{t('Label_Withdrawal_IFSCCode')}
										</li>
										<li>{ifscCode ?? ''}</li>
									</>
								)}
							</>
						) : (
							<>
								<li className='text-org'>
									{t('Label_Withdrawal_WithdrawalTo')}
								</li>
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
					<div className='btnGroup'>
						<button className='btn-secondary' onClick={handleCancelSubmit}>
							{t('Label_General_Cancel')}
						</button>
						<button className='btn-primary' onClick={handleWithdrawalConfirm}>
							{t('Label_General_Submit')}
						</button>
					</div>
				</div>
			</WrapperWithDrawalH5>
		</div>
	)
}

export default WithdrawalConfirmModal
