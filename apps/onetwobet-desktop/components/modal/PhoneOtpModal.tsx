import { CountdownTimer } from '@12b-desktop/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { usePhoneOtpModal } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PhoneOtpModal = () => {
	// ====== hook ======

	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal, closeModal } = useGlobalModal()
	const {
		timer,
		errors,
		startUnixTime,
		trigger,
		register,
		setTimer,
		handleSubmit,
		handleSubmitForm,
		handleSendOtpSMS,
	} = usePhoneOtpModal()

	// ====== 函數 ======

	/** 根據 prevPage 進行導向時，顯示跳轉頁面和彈出確認訊息
	 * @param path - 跳轉的路徑。
	 * @param contentKey - 彈出確認框中顯示的內容 i18n key。
	 * @param submitKey - 彈出確認框中 "確認" 按鈕顯示 i18n key。 */
	const showPrevPageConfirmModal = (
		path: string,
		contentKey: string,
		submitKey: string
	) => {
		modal.confirm(t(contentKey), {
			icon: 'icon icon-icon32px_notification',
			title: t('Label_General_ImportantNotes'),
			okText: t(submitKey),
			cancelText: t('Label_Profile_Later'),
			onOK: () => push(path),
		})
	}

	// ====== useEffect ======

	useEffect(() => {
		handleSendOtpSMS()
	}, [])

	return (
		<div className='pop'>
			<div className='editSuccess active'>
				<div className='icon icon-icon32px_notification' />
				<div className='title'>{t('Label_General_ImportantNotes')}</div>

				<div>
					{t('Label_Profile_SendVerificationCode')} <br />
					{t('Label_Profile_CheckMobileAndEnter')}
				</div>
				<form
					onSubmit={handleSubmit(() =>
						handleSubmitForm(showPrevPageConfirmModal, closeModal)
					)}
					style={{ display: 'contents' }}
				>
					<div
						className={classNames('inputBox-white', {
							error: errors['otpCode'],
						})}
					>
						<input
							{...register('otpCode', {
								required: {
									value: true,
									message: t('Label_Profile_EnterOTPCode'),
								},
								onBlur: () => trigger('otpCode'),
							})}
						/>
					</div>
					<div className='inputModuleRow'>
						<div className='tip active txt-red'>
							{errors['otpCode']?.message as string}
						</div>
					</div>
					<div className='btnGroup'>
						<button className='btn-cancel ghost' onClick={closeModal}>
							{t('Label_General_Close')}
						</button>
						<button type='submit' className='btn-check primary'>
							{t('Label_General_Submit')}
						</button>
					</div>
				</form>

				<div className='resend'>
					{t('Label_Profile_OTPNotReceiveVerificationCode')}

					<div className='btnGroup'>
						<button
							style={{
								minHeight: '36px',
								maxHeight: '36px',
							}}
							className='primary'
							// 有倒數時間就禁止按鈕
							disabled={timer}
							onClick={handleSendOtpSMS}
						>
							{t('Label_Profile_Retransmit')}
						</button>
					</div>
					{timer && (
						<CountdownTimer
							timer={timer}
							startUnixTime={startUnixTime}
							setTimer={setTimer}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export { PhoneOtpModal }
