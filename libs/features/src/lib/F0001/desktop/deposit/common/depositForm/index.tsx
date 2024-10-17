import { DepositModule } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useDepositContext } from '@nx-next-app/data-access'
import { CurrenciesEnum, DepositPaymentEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import DepositAutoRemember from '../DepositAutoRemember'
import AutoDepositForm from './AutoDepositForm'
import BankTransferForm from './BankTransferForm'
import ChatTransferForm from './ChatTransferForm'
import CryptoPayForm from './CryptoPayForm'
import MobilePayForm from './MobilePayForm'
import OnlineBankingForm from './OnlineBankingForm'
import QRPayForm from './QRPayForm'
import QuickTransferForm from './QuickTransferForm'
import TopUpCardForm from './TopUpCardForm'

const {
	AutoDeposit,
	BankTransfer,
	OnlineBanking,
	MobilePay,
	CryptoPay,
	QRPay,
	TopUpCardPay,
	QuickTransfer,
	ChatTransfer,
} = DepositPaymentEnum

const DepositLinePayModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/deposit/common/modal/DepositLinePayModal'
		),
	{ ssr: false }
)
const DepositForm = () => {
	const { t } = useTranslation()
	const {
		push,
		pathname,
		query: { paymentType },
	} = useRouter()

	const { modal } = useGlobalModal()

	const { payments, DEPOSIT_PAYMENT_OPTIONS } = useDepositContext()

	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div className='subModuleListColumn'>
			<DepositModule
				title={t('Label_Deposit_DepositOptions')}
				extra={<DepositAutoRemember />}
			>
				<DepositModule.SubModuleButtonGroup matchKey='paymentType'>
					{Object.keys(payments).map(key => {
						const paymentOption =
							DEPOSIT_PAYMENT_OPTIONS[key as DepositPaymentEnum]

						if (!paymentOption) return null

						const {
							icon,
							labelDisplayKey,
							// timeDisplayKey
						} = paymentOption

						// 10/17新增，VND 的時候 quickTransfer 顯示為 bankTransfer
						const finalDisplayLabelKey =
							currencyId === CurrenciesEnum.VND &&
							key === DepositPaymentEnum.QuickTransfer
								? 'Label_Deposit_BankTransfer'
								: labelDisplayKey

						return (
							<DepositModule.SubModuleButton
								label={t(finalDisplayLabelKey || '')}
								icon={classNames(icon)}
								matchValue={key}
								key={labelDisplayKey}
								onClick={() => {
									if (key === DepositPaymentEnum.LinePay) {
										modal.open(
											<DepositLinePayModal
												link={payments[DepositPaymentEnum.LinePay]?.link}
											/>
										)
										return
									}

									if (paymentType !== key) {
										const url = {
											pathname,
											query: { paymentType: key },
										}

										push(url, undefined, { shallow: true })
									}
								}}
							>
								{/* // * 處理時間區塊 */}
								{/* // *  隱藏簡化畫面，未來有可能再打開 */}
								{/* <div>
									{t('Label_General_CreditTime')} ： {t(timeDisplayKey)}
								</div> */}
								<div />
							</DepositModule.SubModuleButton>
						)
					})}
				</DepositModule.SubModuleButtonGroup>
			</DepositModule>

			{paymentType === AutoDeposit && (
				<AutoDepositForm
					dataSource={payments[DepositPaymentEnum.AutoDeposit] || []}
				/>
			)}

			{paymentType === BankTransfer && (
				<BankTransferForm
					dataSource={payments[DepositPaymentEnum.BankTransfer] || []}
				/>
			)}

			{paymentType === OnlineBanking && (
				<OnlineBankingForm
					dataSource={payments[DepositPaymentEnum.OnlineBanking] || []}
				/>
			)}

			{paymentType === MobilePay && (
				<MobilePayForm
					dataSource={payments[DepositPaymentEnum.MobilePay] || []}
				/>
			)}

			{paymentType === CryptoPay && (
				<CryptoPayForm
					dataSource={payments[DepositPaymentEnum.CryptoPay] || []}
				/>
			)}

			{paymentType === QRPay && (
				<QRPayForm dataSource={payments[DepositPaymentEnum.QRPay] || []} />
			)}

			{paymentType === TopUpCardPay && (
				<TopUpCardForm
					dataSource={payments[DepositPaymentEnum.TopUpCardPay] || []}
				/>
			)}

			{paymentType === QuickTransfer && (
				<QuickTransferForm
					dataSource={payments[DepositPaymentEnum.QuickTransfer] || []}
				/>
			)}

			{paymentType === ChatTransfer && (
				<ChatTransferForm
					dataSource={payments[DepositPaymentEnum.ChatTransfer] || []}
				/>
			)}
		</div>
	)
}

export default DepositForm
