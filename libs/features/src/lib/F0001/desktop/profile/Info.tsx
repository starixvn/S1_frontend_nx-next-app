import dayjs from 'dayjs'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { numberFormat } from '@nx-next-app/utils'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { paths, AREA_CODE } from '@nx-next-app/constants'
import { useSendOTPEmailMutation } from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISelectProps, InputBox, Select } from '@nx-next-app/components/D0001'
import { useCheckPhone } from '@nx-next-app/features/F0001/hooks'
import { PhoneOtpModal } from './PhoneOtpModal'

interface IInfoProps {
	formBirth: Date | null
	setFormBirth: (date: Date | null) => void
}

const Info = ({ formBirth, setFormBirth }: IInfoProps) => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()
	const { REALNAME_REGEX } = useStaticData()

	const {
		userInfo: {
			email,
			regTime,
			phoneNo,
			areaCode,
			userName,
			lastLogin,
			currencyId,
			emailReward,
			phoneReward,
			accountName,
			currencyName,
			phoneVerified,
			emailVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
		},
	} = useAuth()

	const {
		formState,
		trigger,
		setValue,
		register,
		getValues,
		clearErrors,
		getFieldState,
	} = useFormContext()
	const { errors, touchedFields } = formState

	const [phoneErrorTip, setPhoneErrorTip] = useState<string | undefined>('')

	const [sendOTPEmail] = useSendOTPEmailMutation()

	const onPhoneVerify = () => {
		modal.open(<PhoneOtpModal />)
	}

	const onEmailVerify = async () => {
		try {
			await sendOTPEmail({ route: paths.profile.root }).unwrap()
			modal.info(t('Label_Profile_EmailOTPHint1'))
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const { handlePhoneErrorTip } = useCheckPhone()

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

	const handleBirthChange = ({ date }: { date: Date | null }) => {
		setFormBirth(date)
		setValue('birth', date)
	}

	const selectAreaCode = (newAreaCode: ISelectProps['value']) => {
		const formAreaCode = getValues('formAreaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('formAreaCode', newAreaCode)

			// If phone input is not empty, trigger phone check
			const formPhone = getValues('formPhone')
			if (formPhone) checkPhone()
		}
	}

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(el => ({
		value: el.AreaCode,
		label: `${el.AreaCode} ${el.Name}`,
	}))

	const legalBirth = dayjs().subtract(18, 'year')

	return (
		<div className='profile'>
			<div>
				<div>{t('Label_General_RealName')}</div>
				<div>
					{accountName ?? (
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
				</div>
			</div>
			<div>
				<div>{t('Label_Profile_Birthday')}</div>
				{birthDay ? (
					<div>
						{birthDay} / {birthMonth} / {birthYear}
					</div>
				) : (
					<div className='inputBox-blue'>
						<DatePicker
							{...register('birth', {
								required: {
									value: true,
									message: t('Label_Profile_BirthRequired'),
								},
								onBlur: () => trigger('birth'),
							})}
							selected={formBirth}
							onChange={date => handleBirthChange({ date })}
							maxDate={dayjs(legalBirth).toDate()}
							placeholderText='DD/MM/YYYY'
							closeOnScroll
							showDisabledMonthNavigation
							showYearDropdown
						/>
						<div className='iconModule'>
							<i className='icon icon-calendar' />
						</div>
						<div className='tip active txt-red'>
							{errors['birth']?.message as string}
						</div>
					</div>
				)}
			</div>
			<div>
				<div>{t('Label_General_Username')}</div>
				<div>{userName}</div>
			</div>
			<div>
				<div>{t('Label_General_Phone')}</div>
				{phoneNo ? (
					<div>
						({areaCode}){phoneNo}
						{phoneVerified ? (
							<span className='icon icon-Shield' />
						) : (
							<button
								type='button'
								className='icon icon-mobile btn-org'
								onClick={onPhoneVerify}
							>
								{t('Label_Profile_PhoneVerification')}
								<div className='description'>
									<div className='title'>
										{t('Label_Profile_PhoneVerification')}
									</div>
									<div>{t('Label_Profile_PhoneVerificationHint1')}</div>
									<div>
										{t('Label_Profile_PhoneVerificationHint2', {
											currency: currencyName,
											amount: numberFormat(phoneReward ?? 0, currencyId),
										})}
									</div>
								</div>
							</button>
						)}
					</div>
				) : (
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
			</div>
			<div>
				<div>{t('Label_General_Email')}</div>
				{email}
				<div>
					{emailVerified ? (
						<span className='icon icon-Shield' />
					) : (
						<button
							type='button'
							className='icon icon-envelope btn-org'
							onClick={onEmailVerify}
						>
							{t('Label_Profile_EmailVerification')}
							<div className='description'>
								<div className='title'>
									{t('Label_Profile_EmailVerification')}
								</div>
								<div>{t('Label_Profile_EmailVerificationHint1')}</div>
								<div>
									{t('Label_Profile_EmailVerificationHint2', {
										currency: currencyName,
										amount: numberFormat(emailReward ?? 0, currencyId),
									})}
								</div>
							</div>
						</button>
					)}
				</div>
			</div>
			<div>
				<div>{t('Label_Profile_RegisterTime')}</div>
				<div>{dayjs(regTime).format('DD/MM/YYYY HH:mm:ss')}</div>
			</div>
			<div>
				<div>{t('Label_Profile_LastLogin')}</div>
				<div>{dayjs(lastLogin).format('DD/MM/YYYY HH:mm:ss')}</div>
			</div>
		</div>
	)
}

export { Info }
