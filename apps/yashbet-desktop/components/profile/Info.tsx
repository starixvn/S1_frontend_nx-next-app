import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { EMAIL_REGEX, REALNAME_REGEX } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useProfileInfo } from '@nx-next-app/operations'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import DateSelector from 'libs/web/src/components/D0001/dateSelector'
import { useTranslation } from 'next-i18next'
import { InputBox, Loading, Select } from '../common/index'
import { PhoneOtpModal } from '../modal/PhoneOtpModal'

const Info = () => {
	// ====== 常數 ======

	const legalBirth = dayjs().subtract(18, 'year')

	// ====== hook ======

	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		userInfo: {
			email,
			regTime,
			phoneNo,
			areaCode,
			userName,
			lastLogin,
			currencyId,
			phoneReward,
			currencyName,
			phoneVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
			accountName,
		},
	} = useAuth()

	const {
		formMethods,
		watchedBirth,
		phoneErrorTip,
		existsEmailLoading,
		areaCodeSelectOptions,
		checkEmail,
		checkPhone,
		selectAreaCode,
	} = useProfileInfo()

	const { trigger, setValue, register, getValues, formState } = formMethods

	const { errors, touchedFields } = formState

	// ====== 函數 ======

	/**
	 * 顯示電話驗證的彈出視窗
	 * 當用戶點擊驗證電話時，調用該函數來打開 PhoneOtpModal */
	const showPhoneOtpModal = () => modal.open(<PhoneOtpModal />)

	// 等待 response 回來才渲染元件，確保不會發生 react-hydration-error
	if (!lastLogin) return <Loading />

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
					<div className='inputBox-blue' style={{ width: 'auto' }}>
						<DateSelector
							{...register('birth', {
								required: {
									value: true,
									message: t('Label_Profile_BirthRequired'),
								},
								onBlur: () => trigger('birth'),
							})}
							selected={watchedBirth}
							onChange={date => {
								setValue('birth', date)
							}}
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
								onClick={showPhoneOtpModal}
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
							onChange={areaCode => selectAreaCode(areaCode as string)}
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
				<div>
					{email ?? (
						<div>
							<InputBox
								register={register('formEmail', {
									required: {
										value: true,
										message: t('Label_Join_MailWrongFormat'),
									},
									pattern: {
										value: EMAIL_REGEX,
										message: t('Label_Join_MailWrongFormat') as string,
									},
									onBlur: checkEmail,
								})}
								icon='icon icon-email txt-blue'
								placeholder={t('Label_General_Email') as string}
								loading={existsEmailLoading}
								errorMessage={errors['formEmail']?.message as string}
								error={!!errors['formEmail']}
								touched={!!touchedFields['formEmail']}
								successMessage={t('Label_Join_CantChangeEmail') as string}
								infoMessage={t('Label_Join_EmailToolTip') as string}
							/>
						</div>
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
