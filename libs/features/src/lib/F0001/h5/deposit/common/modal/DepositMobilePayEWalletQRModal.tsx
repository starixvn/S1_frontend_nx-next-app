import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	IDepositLocalPayEWalletQRModalProps,
	useAuth,
} from '@nx-next-app/data-access'
import { numberFormat, secondsToTime } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useCopyToClipboard, useCountdown, useTimeout } from 'usehooks-ts'

/**
 * @description  mobilePay 用假渠道開啟時 透過 postDepositLocalPayReq 回來的資料開啟的 e-wallet 彈窗
 * https://jira.ailabpte.co/browse/MS-5588
 */

const DepositLocalPayEWalletQRModal = ({
	convertedAmount,
	qrUrl,
	transId,
}: IDepositLocalPayEWalletQRModalProps) => {
	const { closeModal } = useGlobalModal()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	const [, copy] = useCopyToClipboard()

	const [count, { startCountdown }] = useCountdown({
		countStart: 167, // * 167 秒
		intervalMs: 1000, // * 每 1000 毫秒觸發
	})

	const counterTimeText = secondsToTime(count)

	// * 167000 毫秒後關閉視窗
	useTimeout(closeModal, 167000)

	// * 開始倒數
	useEffect(() => {
		startCountdown()
	}, [])

	return (
		<div className='pop'>
			<div className='popTit'>
				{t('Label_DepositType6')}
				<div
					className='close-popup icon icon-close-line'
					onClick={closeModal}
				/>
			</div>
			<div className='popTxt'>
				<div className='guide'>
					<div className='banklogo'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/promptpay.png`}
							alt=''
						/>
					</div>
					<div className='qrCode'>
						<img
							src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}${qrUrl}`}
							alt='img-qrUrl'
						/>
					</div>
					<div className='amount'>
						{t('Label_Deposit_EWalletQRDesc1')}
						<span>฿ {numberFormat(convertedAmount, currencyId)}</span>
					</div>
					<div className='description'>
						Description:
						<input type='text' value={transId} />
						<button
							className='icon icon-files-empty'
							onClick={() => copy(transId)}
						/>
					</div>
					<div className='info'>
						<p>{t('Label_Deposit_EWalletQRDesc2')}</p>
						<div>{t('Label_Deposit_EWalletQRDesc3')}</div>
						<div>
							{t('Label_Deposit_EWalletQRDesc4')}
							<span>
								{` `} {counterTimeText} {` `}
							</span>
							{t('Label_Deposit_EWalletQRDesc5')}
						</div>
						<div>
							{t('Label_Deposit_EWalletQRDesc6')}
							<span> {t('Label_Deposit_EWalletQRDesc7')}</span>
						</div>
					</div>
				</div>
				<div className='title'>{t('Label_Deposit_EWalletQRDesc8')}</div>
				<ul>
					<li>{t('Label_Deposit_EWalletQRDesc9')}</li>
					<li>{t('Label_Deposit_EWalletQRDesc10')}</li>
					<li>{t('Label_Deposit_EWalletQRDesc11')}</li>
					<li>{t('Label_Deposit_EWalletQRDesc12')}</li>
				</ul>
			</div>
		</div>
	)
}

export default DepositLocalPayEWalletQRModal
