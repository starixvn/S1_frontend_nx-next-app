import { Form, InputBox, Select } from '@12b-indo-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { EMAIL_REGEX, REALNAME_REGEX } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useProfileInfo } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { PhoneOtpModal } from '../modal/PhoneOtpModal'

const InfoEdit = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { push } = useRouter()

	const {
		userInfo: { email, phoneNo, accountName, birth_d: birthDay },
	} = useAuth()

	const {
		dayOptions,
		yearOptions,
		monthOptions,
		formMethods,
		phoneErrorTip,
		showSubmitBtn,
		existsEmailLoading,
		areaCodeSelectOptions,
		checkPhone,
		checkEmail,
		selectAreaCode,
		handleSubmitForm,
	} = useProfileInfo()

	const { trigger, setValue, register, getValues, handleSubmit, formState } =
		formMethods

	const { errors, touchedFields } = formState

	// ======  函數	 ======

	/**
	 * 處理錯誤並顯示錯誤信息
	 * 當發生錯誤時，會將錯誤訊息通過 modal 顯示給使用者
	 * @message - 錯誤訊息 */
	const showErrorModal = (message: string) => modal.error(message)

	const emailFieldRenderer = () => {
		if (email) return <div>{email}</div>
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

	/** 當表單成功提交後，顯示確認訊息 */
	const showConfirmModal = () => {
		modal.confirm(t('Label_Profile_VertifyContactConfirm'), {
			icon: 'icon icon-icon32px_notification',
			title: t('Label_General_UpdateSuccessful'),
			okText: t('Label_Profile_VertifyNow'),
			cancelText: t('Label_Profile_Later'),
			onOK: () => modal.open(<PhoneOtpModal />),
		})
	}

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

	/** 顯示用於更新個人資料的確認彈窗
	 *  當用戶提交個人資料變更時，顯示確認彈窗，提醒用戶資料變更，
	 *  並允許用戶確認或重新修改。
	 *  @param setFormProfile - 當用戶確認提交後調用的 callBack ，用於執行表單提交邏輯 */
	const showProfileModifyWarningModal = (
		setFormProfile: () => Promise<void>
	) => {
		modal.confirm(t('Label_Profile_ProfileModifyWarning'), {
			icon: 'icon icon-icon32px_notification',
			title: t('Label_General_ImportantNotes'),
			okText: t('Label_General_Confirm'),
			cancelText: t('Label_Profile_ReModify'),
			onOK: setFormProfile,
		})
	}

	return (
		<Form
			onSubmit={handleSubmit(() =>
				handleSubmitForm(
					showConfirmModal,
					showErrorModal,
					showPrevPageConfirmModal,
					showProfileModifyWarningModal
				)
			)}
		>
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

			{showSubmitBtn && (
				<div className='btn-group'>
					<button className='primary' type='submit'>
						{t('Label_General_Submit')}
					</button>
				</div>
			)}
		</Form>
	)
}

export { InfoEdit }
