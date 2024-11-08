import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useWithdrawal, WithdrawalBankCardEnum } from '@nx-next-app/operations'
import { isConvert, numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const WithdrawalSuccessModal = dynamic(
	() => import('../modal/WithdrawalSuccessModal'),
	{ ssr: false }
)

const Confirm = () => {
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()

	const {
		selectedBankInfo,
		withdrawalAmount,
		handleCancelSubmit,
		accountName,
		exchangeInfo: { exchangeAmount },
		handleWithdrawalConfirm,
	} = useWithdrawal()

	const {
		userInfo: { currencyId },
	} = useAuth()

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
		<div className='subModule'>
			<div className='subModuleBody column align-items-center'>
				<span className='title'>{t('Label_General_ImportantNote')}</span>
				<div className='txt-lightgray'>
					{t('Label_Withdrawal_ConfirmWithdrawal')}
				</div>

				{type !== WithdrawalBankCardEnum.Crypto ? (
					<div className='smallList'>
						<ul>
							<li>{t('Label_Withdrawal_WithdrawalTo')}</li>
							<li>{bankName}</li>
						</ul>
						<ul>
							<li>{t('Label_Withdrawal_AccountNumber')}</li>
							<li className='accountNumber'>
								<span>{accountNo?.slice(0, 4)}</span>
								<span>{accountNo?.slice(4, 8)}</span>
								<span>{accountNo?.slice(8, 12)}</span>
								<span>{accountNo?.slice(12, 16)}</span>
							</li>
						</ul>
						<ul>
							<li>{t('Label_Withdrawal_BankAccountName')}</li>
							<li>{accountName}</li>
						</ul>

						<ul>
							<li>{t('Label_Withdrawal_WithdrawalAmount')}</li>
							<li>{displayAmount}</li>
						</ul>
						{ifscCode && (
							<ul>
								<li>{t('Label_Withdrawal_IFSCCode')}</li>
								<li>{ifscCode ?? ''}</li>
							</ul>
						)}
					</div>
				) : (
					<>
						<div className='smallList'>
							<ul>
								<li>{t('Label_Withdrawal_CryptoWalletAddress')}</li>
								<li>{usdtAddress}</li>
							</ul>
							<ul>
								<li>{t('Label_Withdrawal_CryptoWalletNickName')}</li>
								<li>{nickName}</li>
							</ul>

							<ul>
								<li>{t('Label_Withdrawal_WithdrawalAmount')}</li>
								<li>{displayAmount}</li>
							</ul>
							<ul>
								<li>
									{t('Label_Withdrawal_ReceiveUSDT', {
										currencyName,
									})}
								</li>
								<li>{exchangeAmount}</li>
							</ul>
						</div>
						<div className='txt-lightgray'>
							{t('Label_Withdrawal_WithdrawalCryptoNote')}
						</div>
					</>
				)}
				<div className='btnGroup'>
					<button className='ghost' onClick={handleCancelSubmit}>
						{t('Label_General_Cancel')}
					</button>
					<button
						className='primary'
						onClick={() =>
							handleWithdrawalConfirm(
								{},
								{
									successCallback: onFinish => {
										modal.open(
											<WithdrawalSuccessModal
												onClick={() => {
													closeModal()
													onFinish()
												}}
											/>
										)
									},
									errorCallback: errorMessage => {
										modal.error(errorMessage)
									},
								}
							)
						}
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			</div>
		</div>
	)
}

export { Confirm }
