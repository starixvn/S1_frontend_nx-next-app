import { useCopyToClipboard, useCountdown, useTimeout } from 'usehooks-ts'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { numberFormat, secondsToTime } from '@nx-next-app/utils'
import { DepositPaymentEnum } from '@nx-next-app/types'
import { IDepositQRCodeModalProps, useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import QRCode from 'qrcode.react'
import dayjs from 'dayjs'

// * 存款以 QR CODE 呈現的通用元件
const DepositQRCodeModal = ({
	title,
	convertedAmount,
	info: { url, thirdId, formData },
}: IDepositQRCodeModalProps) => {
	const {
		query: { paymentType },
	} = useRouter()
	const {
		userInfo: { currencyName, currencyId },
	} = useAuth()
	const { t } = useTranslation()
	const [, copy] = useCopyToClipboard()

	const { closeModal } = useGlobalModal()

	const [count, { startCountdown }] = useCountdown({
		countStart: 600, // * 600 秒
		intervalMs: 1000, // * 1000 毫秒
	})

	const {
		DepositAmount: depositAmount = 0,
		AccountNumber: accountNumber = 0,
		BankName: bankName,
		AccountName: accountName,
		Token: token,
		Rate: rate,
		RequestAmount: requestAmount, // * CryptoPay 換匯之後的金額, ex: MYR 200 => 0.00160072
		PromotionAmount: promotionAmount = 0,
		PromotionRate: promotionRate,
		Promotion: promotion,
	} = formData

	const isCryptoPay = paymentType === DepositPaymentEnum.CryptoPay

	const isCashbackPromotion = promotion === '1'

	const cashbackAmount = promotionAmount

	const receivedAmount = promotionAmount + depositAmount

	const amountText = numberFormat(convertedAmount, currencyId)

	const depositAmountText = `${currencyName} ${numberFormat(
		depositAmount,
		currencyId,
		0
	)}`

	const nowTimeText = dayjs().format('YYYY-MM-DD H:mm:ss')

	const counterTimeText = secondsToTime(count)

	// * 600000 毫秒後關閉視窗
	useTimeout(closeModal, 600000)

	// * 開始倒數
	useEffect(() => {
		startCountdown()
	}, [])

	return (
		<div className='pop'>
			<div className='dragonPayPop active'>
				<div className='popTit'>
					{title}
					<div className='icon icon-close' onClick={closeModal} />
				</div>
				<div className='title'>{t('Label_Deposit_PaymentDetails')}：</div>

				{thirdId && (
					<div>
						{t('Label_Deposit_OrderNumber')}：<span>{thirdId}</span>
					</div>
				)}

				<div>
					{t('Label_General_Time')}：<span>{nowTimeText}</span>
				</div>

				<div>
					{t('Label_Deposit_OrderAmount')}：
					<span>
						{currencyName} {amountText}
					</span>
				</div>

				{isCashbackPromotion && (
					<>
						<div>
							{t('Label_Deposit_CashbackAmount')}：
							<span>
								{`${numberFormat(
									cashbackAmount,
									currencyId
								)}(${promotionRate})`}
								%
							</span>
						</div>
						<div>
							{t('Label_Deposit_ReceivedAmount')}：
							<span>{numberFormat(receivedAmount, currencyId)}</span>
						</div>
					</>
				)}

				<div className='guide'>
					{isCryptoPay ? (
						<QRCode id={url} value={url} renderAs='svg' includeMargin />
					) : (
						<img src={url} className='qrCode' alt='qrcode' />
					)}

					{isCryptoPay ? (
						<div className='accountInfo'>
							<div style={{ wordBreak: 'break-all', textAlign: 'center' }}>
								{url}
							</div>
							<div>
								<button className='copyBtn' onClick={() => copy(url)}>
									{t('Label_General_Copy')}
								</button>
							</div>
							<div>
								{t('Label_General_Method')}: {token}
							</div>
							<div>
								{t('Label_General_Rate')}: {rate}
							</div>
							<div>
								{`${token} ${t('Label_General_Amount')}`}: {requestAmount}{' '}
								<button
									className='copyBtn'
									onClick={() => copy(String(requestAmount))}
								>
									{t('Label_General_Copy')}
								</button>
							</div>
						</div>
					) : (
						<div>
							{`${t('Label_Deposit_Pay')} `}
							<span>{depositAmountText}</span>
						</div>
					)}

					{!!accountNumber && (
						<div className='accountInfo'>
							<div
								style={{
									wordBreak: 'break-all',
									textAlign: 'center',
								}}
							>
								{t('Label_General_BankName')}：{bankName}
							</div>
							<div>
								{t('Label_General_AccountName')}：{accountName}
								<button
									className='copyBtn'
									onClick={() => copy(String(accountName))}
								>
									{t('Label_General_Copy')}
								</button>
							</div>
							<div>
								{t('Label_General_AccountNumber')}：{accountNumber}
								<button
									className='copyBtn'
									onClick={() => copy(String(accountNumber))}
								>
									{t('Label_General_Copy')}
								</button>
							</div>
						</div>
					)}

					<ul>
						<li>{t('Label_Deposit_PaymentQRDesc1')}</li>
						<li>{t('Label_Deposit_PaymentQRDesc2')}</li>
					</ul>
				</div>

				<div className='title'>{`${t('Label_General_ImportantNotes')}：`}</div>
				<ul>
					<li>{t('Label_Deposit_PaymentQRNote1')}</li>
					<li>{t('Label_Deposit_PaymentQRNote2')}</li>
				</ul>
				<div className='sisa'>
					<div>{t('Label_Deposit_PaymentTimeLeft')}</div>
					<div>{counterTimeText}</div>
				</div>
			</div>
		</div>
	)
}

export default DepositQRCodeModal
