import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	WithdrawalBankCardEnum,
	WithdrawalPanelStatusEnum,
} from '@nx-next-app/features/F0001/types'
import { useWithdrawal } from '@nx-next-app/operations'
import {
	IBankInfoData,
	IDeleteBankCardArgs,
	IDeleteEWalletCardArgs,
	IEWalletData,
	useDeleteBankCardMutation,
	useDeleteEWalletCardMutation,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

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
	const { selectedBankInfo, withdrawalStatus, accountName, handleSelectCard } =
		useWithdrawal()

	const { accountNo = '', sysId } = item

	// 這兩個參數名稱叫不一樣，可是用法一模壹樣
	const rawBankLogo =
		(item as IBankInfoData)?.bankLogo ?? (item as IEWalletData)?.eWalletLogo
	const bankName =
		(item as IBankInfoData)?.bankName ?? (item as IEWalletData)?.eWalletName

	const { ifscCode, disabled = false } = item as IBankInfoData

	const checked =
		accountNo === selectedBankInfo.accountNo &&
		bankName === selectedBankInfo.bankName &&
		type === selectedBankInfo.type

	const bankLogo = String(rawBankLogo).toLowerCase()

	const { modal } = useGlobalModal()

	const [deleteBankCard] = useDeleteBankCardMutation()
	const [deleteEWalletCard] = useDeleteEWalletCardMutation()

	// 刪 localBank
	const handleDeleteBankCard = async (args: IDeleteBankCardArgs) => {
		modal.confirm(
			[
				t('Label_Withdrawal_DeleteConfirm1') ?? '',
				t('Label_Withdrawal_DeleteConfirm2') ?? '',
			],
			{
				title: t('Label_General_Oh'),
				onOK: async () => {
					try {
						await deleteBankCard(args).unwrap()
					} catch (error) {
						modal.error((error as Error).message)
					}
				},
				okText: t('Label_General_Yes'),
				cancelText: t('Label_General_No'),
			}
		)
	}

	const handleDeleteEWalletCard = async (args: IDeleteEWalletCardArgs) => {
		modal.confirm(
			[
				t('Label_Withdrawal_DeleteConfirm1') ?? '',
				t('Label_Withdrawal_DeleteConfirm2') ?? '',
			],
			{
				title: t('Label_General_Oh'),
				onOK: async () => {
					try {
						await deleteEWalletCard(args).unwrap()
					} catch (error) {
						modal.error((error as Error).message)
					}
				},
				okText: t('Label_General_Yes'),
				cancelText: t('Label_General_No'),
			}
		)
	}

	return (
		<div
			className={classNames('addBankName', { pending: disabled })}
			key={`${accountNo}-${sysId}`}
		>
			{disabled && (
				<div className='mask'>{t('Label_General_UnderMaintenance')}</div>
			)}

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
								<div className='txt-blue'>
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
						id={`${accountNo}-${type}`}
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
						disabled={disabled}
					/>
					<label
						htmlFor={`${accountNo}-${type}`}
						className='icon icon-checkbox-checked'
					/>
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
