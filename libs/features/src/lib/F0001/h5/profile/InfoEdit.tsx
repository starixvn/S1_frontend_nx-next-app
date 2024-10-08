import {
	Form,
	ISelectProps,
	InputBox,
	Select,
} from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	AREA_CODE,
	EMAIL_REGEX,
	PREV_PAGE,
	PrevPageEnum,
	REALNAME_REGEX,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	useCheckPhone,
	useVerifyEmail,
} from '@nx-next-app/features/F0001/hooks'
import {
	useLazyExistsEmailQuery,
	useSetProfileMutation,
} from '@nx-next-app/service'
import dayjs from 'dayjs'
import { isUndefined } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { PhoneOtpModal } from './PhoneOtpModal'

const InfoEdit = () => {
	const { t } = useTranslation()

	const { push, query } = useRouter()
	const { key, emailcode, prevPage } = query

	const { modal } = useGlobalModal()

	const { onVerifyEmail } = useVerifyEmail()
	const { handlePhoneErrorTip } = useCheckPhone()

	const [setProfile] = useSetProfileMutation()

	const [phoneErrorTip, setPhoneErrorTip] = useState<string | undefined>('')

	const [checkExistsEmail, { isFetching: existsEmailLoading }] =
		useLazyExistsEmailQuery()

	const {
		userInfo: {
			email,
			phoneNo,
			areaCode,
			accountName,
			phoneVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
		},
	} = useAuth()

	const legalBirthYear = dayjs().subtract(18, 'year').year()

	const {
		formState,
		watch,
		trigger,
		setValue,
		register,
		setError,
		getValues,
		clearErrors,
		getFieldState,
		handleSubmit,
	} = useForm({
		defaultValues: {
			formBirthDay: 1,
			formBirthMonth: 1,
			formBirthYear: legalBirthYear,
			formRealName: '',
			formPhone: '',
			formAreaCode: '',
			formEmail: '',
		},
	})
	const { errors, touchedFields } = formState

	const selectAreaCode = (newAreaCode: ISelectProps['value']) => {
		const formAreaCode = getValues('formAreaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('formAreaCode', newAreaCode as string)

			const formPhone = getValues('formPhone')
			if (formPhone) checkPhone()
		}
	}

	const checkPhone = async () => {
		await trigger('formPhone')
		const { error } = getFieldState('formPhone')

		const errorTip = handlePhoneErrorTip({
			phoneError: error?.message,
			formAreaCode: getValues('formAreaCode'),
			formPhone: getValues('formPhone'),
		})

		if (errorTip) {
			setPhoneErrorTip(errorTip)
		} else {
			setPhoneErrorTip('')
			clearErrors('formPhone')
		}
	}

	const handleSubmitForm = () => {
		const setFormProfile = async () => {
			const { formAreaCode, formPhone, formRealName, formEmail } = getValues()

			try {
				//* 既有的資料依然需要傳進 api
				await setProfile({
					AccountName: accountName ?? formRealName,
					AreaCode: areaCode ?? formAreaCode,
					Birth_d: birthDay ?? String(getValues('formBirthDay')),
					Birth_m: birthMonth ?? String(getValues('formBirthMonth')),
					Birth_y: birthYear ?? String(getValues('formBirthYear')),
					PhoneNo: phoneNo ?? formPhone,
					Email: email ?? formEmail,
				}).unwrap()

				if (!phoneVerified) {
					modal.confirm(t('Label_Profile_VertifyContactConfirm'), {
						icon: 'icon icon-icon32px_notification',
						title: t('Label_General_UpdateSuccessful'),
						okText: t('Label_Profile_VertifyNow'),
						cancelText: t('Label_Profile_Later'),
						onOK: () => modal.open(<PhoneOtpModal />),
					})
				} else if (prevPage) {
					const { path, contentKey, submitKey } =
						PREV_PAGE[prevPage as PrevPageEnum]

					modal.confirm(t(contentKey), {
						icon: 'icon icon-icon32px_notification',
						title: t('Label_General_ImportantNotes'),
						okText: t(submitKey),
						cancelText: t('Label_Profile_Later'),
						onOK: () => push(path),
					})
				}
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		modal.confirm(t('Label_Profile_ProfileModifyWarning'), {
			icon: 'icon icon-icon32px_notification',
			title: t('Label_General_ImportantNotes'),
			okText: t('Label_General_Confirm'),
			cancelText: t('Label_Profile_ReModify'),
			onOK: setFormProfile,
		})
	}

	const yearOptions = []
	for (let y = legalBirthYear; y >= legalBirthYear - 59; y -= 1) {
		yearOptions.push({ label: y, value: y })
	}

	const monthOptions = []
	for (let m = 1; m <= 12; m += 1) {
		monthOptions.push({ label: t(`Label_Profile_Month${m}`), value: m })
	}

	watch('formBirthMonth')
	watch('formBirthYear')
	const dayOptions = []
	const dayByMonth = dayjs()
		.year(getValues('formBirthYear'))
		.month(getValues('formBirthMonth') - 1) // month start from 0 (January)
		.daysInMonth()
	for (let d = 1; d <= dayByMonth; d += 1) {
		dayOptions.push({ label: d, value: d })
	}

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(el => ({
		value: el.AreaCode,
		label: `${el.AreaCode} ${el.Name}`,
	}))

	const showSubmitBtn = !accountName || !phoneNo || !birthDay || !email

	const checkEmail = async () => {
		await trigger('formEmail')
		const { error } = getFieldState('formEmail')
		const formEmail = getValues('formEmail')
		if (error) return
		// check email duplicate from api
		try {
			const { data: isExistsEmail } = await checkExistsEmail({
				email: formEmail,
			}).unwrap()

			if (isExistsEmail) {
				setError('formEmail', {
					type: 'duplicate',
					message: t('Label_Profile_MailExisted') ?? '',
				})
			}
		} catch (error) {
			// error
		}
	}

	const emailFieldRenderer = () => {
		if (email) {
			return <div>{email}</div>
		}
		return (
			<InputBox
				register={register('formEmail', {
					required: { value: true, message: t('Label_Profile_EmailReq') },
					pattern: {
						value: EMAIL_REGEX,
						message: t('Label_Profile_MailWrongFormat') || '',
					},
					onBlur: checkEmail,
				})}
				icon='icon icon-email txt-blue'
				placeholder={t('Label_General_Email') as string}
				loading={existsEmailLoading}
				errorMessage={errors['formEmail']?.message as any}
				error={!!errors['formEmail']}
				touched={!!touchedFields['formEmail']}
			/>
		)
	}

	useEffect(() => {
		if (!isUndefined(key) && !isUndefined(emailcode)) {
			onVerifyEmail({
				key: key as string,
				code: emailcode as string,
			})
		}
	}, [key, emailcode])

	return (
		<Form onSubmit={handleSubmit(handleSubmitForm)}>
			{!email && <div>{emailFieldRenderer()}</div>}
			{!birthDay && (
				<div className='infoModule parts'>
					<Select
						options={monthOptions}
						prefixIcon={<i className='icon icon-cake' />}
						onChange={m => setValue('formBirthMonth', m as number)}
						value={getValues('formBirthMonth')}
					/>
					<Select
						options={dayOptions}
						onChange={d => setValue('formBirthDay', d as number)}
						value={getValues('formBirthDay')}
					/>
					<Select
						options={yearOptions}
						onChange={y => setValue('formBirthYear', y as number)}
						value={getValues('formBirthYear')}
					/>
				</div>
			)}
			{!accountName && (
				<InputBox
					register={register('formRealName', {
						required: { value: true, message: t('Label_Join_RealNameReq') },
						pattern: {
							value: REALNAME_REGEX,
							message: t('Label_Join_EnterRealName') || '',
						},
						onBlur: () => trigger('formRealName'),
					})}
					icon='icon-member txt-blue'
					placeholder={t('Label_General_RealName') as string}
					errorMessage={errors['formRealName']?.message as string}
					error={!!errors['formRealName']}
					touched={!!touchedFields['formRealName']}
					infoMessage={t('Label_General_RemindForName') as string}
				/>
			)}

			{!phoneNo && (
				<div className='phone'>
					<Select
						showSearch
						options={areaCodeSelectOptions}
						prefixIcon={<i className='icon icon-phone txt-blue' />}
						onChange={areaCode => selectAreaCode(areaCode)}
						value={getValues('formAreaCode')}
						errorMessage={phoneErrorTip}
					/>
					<InputBox
						register={register('formPhone', {
							required: {
								value: true,
								message: t('Label_Join_PhoneRequired'),
							},
							onBlur: checkPhone,
						})}
						placeholder={t('Label_General_Phone') as string}
						error={!!errors['formPhone'] || !!phoneErrorTip}
						touched={!!touchedFields['formPhone']}
						errorMessage={phoneErrorTip}
						infoMessage={t('Label_Join_CantChangePhone') as string}
					/>
				</div>
			)}

			{showSubmitBtn && (
				<div className='btn-group'>
					<button type='submit'>{t('Label_General_Submit')}</button>
				</div>
			)}
		</Form>
	)
}

export { InfoEdit }
