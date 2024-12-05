import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	IDepositMobilePayBankQRModalProps,
	useAuth,
} from '@nx-next-app/data-access'
import { secondsToTime } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useCountdown, useTimeout } from 'usehooks-ts'

/**
 * @description  mobilePay 用假渠道開啟時 透過 postDepositLocalPayReq 回來的資料開啟的 bank 彈窗
 * https://jira.ailabpte.co/browse/MS-2391
 */
const DepositMobilePayBankQRModal = ({
	convertedAmount,
	qrUrl,
	channelName,
}: IDepositMobilePayBankQRModalProps) => {
	const { closeModal } = useGlobalModal()

	const {
		userInfo: { currencyName },
	} = useAuth()
	const { t } = useTranslation()

	const [count, { startCountdown }] = useCountdown({
		countStart: 300, // * 300 秒
		intervalMs: 1000, // * 每 1000 毫秒觸發
	})

	const counterTimeText = secondsToTime(count)

	// * 300000 毫秒後關閉視窗
	useTimeout(closeModal, 300000)

	// * 開始倒數
	useEffect(() => {
		startCountdown()
	}, [])

	return (
		<div className='pop'>
			<div className='popTit'>
				{channelName}
				<div
					className='close-popup icon icon-close-line'
					onClick={closeModal}
				/>
			</div>
			<div className='popTxt'>
				<div className='title'>{t('Label_Deposit_ScanAndPay')}</div>

				<div className='amount'>
					{t('Label_General_Amount')}
					<span>
						{currencyName} {convertedAmount}
					</span>
				</div>
				<div className='guide'>
					<div className='qrCode'>
						<img
							src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}${qrUrl}`}
							alt='img-qrUrl'
						/>
					</div>
					<div className='sisa'>
						<div>{t('Label_Deposit_PaymentTimeLeft')}</div>
						<div>
							<span>{counterTimeText}</span>
						</div>
					</div>
				</div>
				<div className='title'>{t('Label_General_ImportantNotes')}：</div>
				<ul>
					<li>{t('Label_Deposit_DuitNowQRNote1')}</li>
					<li>{t('Label_Deposit_DuitNowQRNote2')}</li>
				</ul>
			</div>
		</div>
	)
}

export default DepositMobilePayBankQRModal
