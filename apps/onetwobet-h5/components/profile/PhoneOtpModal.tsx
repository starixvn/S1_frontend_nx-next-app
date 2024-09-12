import { CountdownTimer, Form } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { usePhoneOtpModal } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const PhoneOtpModal = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const {
		timer,
		errors,
		startUnixTime,
		trigger,
		register,
		setTimer,
		closeModal,
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
	return (
		<div className='pop'>
			<div className='popTit'>
				{t('Label_General_ImportantNotes')}
				<div className='icon icon-close' onClick={closeModal} />
			</div>

			<div className='popTxt text-center'>
				<div className='txt'>
					{t('Label_Profile_SendVerificationCode')}.{' '}
					{t('Label_Profile_CheckMobileAndEnter')}
				</div>
				<Form
					className='infoModule'
					onSubmit={handleSubmit(() =>
						handleSubmitForm(showPrevPageConfirmModal)
					)}
				>
					<div
						className={classNames('inputBox', {
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
					<div className='btn-group'>
						<button type='submit' className='submit'>
							{t('Label_General_Submit')}
						</button>
					</div>
				</Form>
				{timer ? (
					<CountdownTimer
						timer={timer}
						startUnixTime={startUnixTime}
						setTimer={setTimer}
					/>
				) : (
					<div className='btn-group'>
						<button className='submit' onClick={handleSendOtpSMS}>
							{t('Label_Profile_Retransmit')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export { PhoneOtpModal }
