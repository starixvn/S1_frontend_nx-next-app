import { CountdownTimer, Form } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PREV_PAGE, PrevPageEnum } from '@nx-next-app/constants'
import { usePhoneOtp } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const PhoneOtpModal = () => {
	const { t } = useTranslation()
	const { push, query } = useRouter()
	const { prevPage } = query

	const { modal, closeModal } = useGlobalModal()

	const { formState, trigger, setError, register, getValues, handleSubmit } =
		useForm()
	const { errors } = formState

	const { timer, startUnixTime, setTimer, handleSendOtpSMS, handleVerifyOtp } =
		usePhoneOtp()

	const handleSubmitForm = async () => {
		const otpCode = getValues('otpCode')

		const errorMsg = await handleVerifyOtp({
			otpCode,
			callbackFn: () => {
				if (prevPage) {
					const { path, contentKey, submitKey } =
						PREV_PAGE[prevPage as PrevPageEnum]

					modal.confirm(t(contentKey), {
						icon: 'icon icon-notifi icon-notification-active',
						title: t('Label_General_ImportantNotes'),
						okText: t(submitKey),
						cancelText: t('Label_Profile_Later'),
						onOK: () => push(path),
					})
				} else {
					closeModal()
				}
			},
		})

		if (errorMsg) setError('otpCode', { type: 'manual', message: errorMsg })
	}

	useEffect(() => {
		handleSendOtpSMS()
	}, [])

	return (
		<div className='pop'>
			<i className='icon icon-notifi icon-notification-active' />
			<div className='popTit'>
				{t('Label_General_ImportantNotes')}
				<div
					className='close-popup icon icon-close-line'
					onClick={closeModal}
				/>
			</div>

			<div className='popTxt text-center'>
				<div className='txt'>
					{t('Label_Profile_SendVerificationCode')}.{' '}
					{t('Label_Profile_CheckMobileAndEnter')}
				</div>
				<Form className='infoModule' onSubmit={handleSubmit(handleSubmitForm)}>
					<div
						className={classNames('inputBox-blue', {
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
					{timer && (
						<CountdownTimer
							timer={timer}
							startUnixTime={startUnixTime}
							setTimer={setTimer}
						/>
					)}
					<div className='btnGroup'>
						<button type='submit' className='btn-primary'>
							{t('Label_General_Submit')}
						</button>
						<button className='btn-secondary' onClick={handleSendOtpSMS}>
							{t('Label_Profile_Retransmit')}
						</button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export { PhoneOtpModal }
