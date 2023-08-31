import dayjs from 'dayjs'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
	useVerifyOTPMutation,
	useSendOTPSMSMutation,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	OtpErrorCodeEnum,
	PrevPageEnum,
	PREV_PAGE,
} from '@nx-next-app/constants'
import { Form } from '@nx-next-app/components/H0001'

const PhoneOtpModal = () => {
	const { t } = useTranslation()
	const { push, query } = useRouter()
	const { prevPage } = query

	const { modal, closeModal } = useGlobalModal()

	const { formState, trigger, setError, register, getValues, handleSubmit } =
		useForm()
	const { errors } = formState

	const [timer, setTimer] = useState<boolean>(false)

	const [sendOtpSMS, { data: { data: { startUnixTime = 0 } = {} } = {} }] =
		useSendOTPSMSMutation()

	const [verifyOtp] = useVerifyOTPMutation()

	const handleSubmitForm = async () => {
		const otpCode = getValues('otpCode')
		try {
			await verifyOtp({ otpCode }).unwrap()

			if (prevPage) {
				const { path, contentKey, submitKey } =
					PREV_PAGE[prevPage as PrevPageEnum]

				modal.confirm(t(contentKey), {
					icon: 'icon icon-icon32px_notification',
					title: t('Label_General_ImportantNotes'),
					okText: t(submitKey),
					cancelText: t('Label_Profile_Later'),
					onOK: () => push(path),
				})
			} else {
				closeModal()
			}
		} catch (error) {
			const { errorCode, message } =
				(error as {
					errorCode: number
					message: string
					status: number
				}) || {}

			let errorMsg = message
			if (errorCode === OtpErrorCodeEnum.WrongPhoneNumber) {
				errorMsg = t('Label_Profile_APISendOTPSMS_5002')
			} else {
				errorMsg = t('Label_Profile_OTPInvalid')
			}

			setError('otpCode', {
				type: 'manual',
				message: errorMsg,
			})
		}
	}

	const sendOTPCode = async () => {
		try {
			await sendOtpSMS().unwrap()
			setTimer(true)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	useEffect(() => {
		sendOTPCode()
	}, [])

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
				<Form className='infoModule' onSubmit={handleSubmit(handleSubmitForm)}>
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
						<button className='submit' onClick={sendOTPCode}>
							{t('Label_Profile_Retransmit')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

const CountdownTimer = ({
	timer,
	startUnixTime,
	setTimer,
}: {
	timer: boolean
	startUnixTime?: number
	setTimer: (state: boolean) => void
}) => {
	let initTime = 0
	if (startUnixTime) {
		initTime = startUnixTime + 300 - dayjs().unix()
	}

	const [remainingTime, setRemainingTime] = useState<number>(initTime)

	if (remainingTime <= 0) {
		setTimer(false)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (timer && remainingTime > 0) {
				setRemainingTime(prevTime => prevTime - 1)
			}
		}, 1000)

		return () => {
			clearInterval(interval)
			setTimer(false)
		}
	}, [startUnixTime, timer])

	const formatTime = dayjs.unix(remainingTime).format('mm:ss')

	return <div className='txt-blue2'>( {formatTime} )</div>
}

export { PhoneOtpModal }
