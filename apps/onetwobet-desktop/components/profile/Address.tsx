import { Form, InputBox } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useAddress } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { PhoneOtpModal } from './PhoneOtpModal'

const Address = () => {
	// ====== hook ======

	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const {
		userInfo: {
			addressCity,
			addressState,
			addressCountry,
			addressPostCode,
			addressLineFirst,
			addressLineSecond,
			currencyId,
		},
	} = useAuth()

	const {
		errors,
		touchedFields,
		register,
		trigger,
		handleSubmit,
		handleSubmitForm,
	} = useAddress()

	// ====== 函數 ======

	/** 當表單成功提交後，顯示確認訊息 */
	const showConfirmModal = () => {
		modal.confirm(
			<div>
				{t('Label_General_Awesome')}!
				<br />
				{t('Label_Profile_VertifyContactConfirm')}
			</div>,
			{
				icon: 'icon icon-icon32px_notification',
				title: t('Label_General_UpdateSuccessful'),
				okText: t('Label_Profile_VertifyNow'),
				cancelText: t('Label_Profile_Later'),
				onOK: () => modal.open(<PhoneOtpModal />),
			}
		)
	}

	/**
	 * 處理錯誤並顯示錯誤信息
	 * 當發生錯誤時，會將錯誤訊息通過 modal 顯示給使用者
	 * @message - 錯誤訊息 */
	const showErrorModal = (message: string) => modal.error(message)

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
	 *  @param setAddress 當用戶確認提交地址變更後執行的 callBack，該 callBack 負責地址更新邏輯 */
	const showProfileModifyWarningModal = (setAddress: () => Promise<void>) => {
		modal.confirm(t('Label_Profile_ProfileModifyWarning'), {
			icon: 'icon icon-icon32px_notification',
			title: t('Label_General_ImportantNotes'),
			okText: t('Label_General_Confirm'),
			cancelText: t('Label_Profile_ReModify'),
			onOK: setAddress,
		})
	}

	if (!includes(ALLOWED_CURRENCIES['ADDRESS'] as CurrenciesEnum[], currencyId))
		return null

	return (
		<div className='addressModule'>
			<div className='address-container'>
				<div className='inside-title'>
					<span>
						{t('Label_Profile_ShippingAddress')}({t('Label_Profile_Option2')})
					</span>
					<div>{t('Label_Profile_ShippingHint')}</div>
				</div>
				<div className='sub-title'>{t('Label_Profile_Address')}</div>
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
					<div className='address-list'>
						{addressCountry ? (
							<>
								<div>{addressLineFirst}</div>
								{addressLineSecond && <div>{addressLineSecond}</div>}
								<div>
									{addressCity}, {addressPostCode}
								</div>
								<div>
									{addressState}, {addressCountry}
								</div>
							</>
						) : (
							<>
								<div>
									<div>{t('Label_Profile_Line1')}</div>
									<div>
										<InputBox
											register={register('formLineFirst', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formLineFirst'),
											})}
											errorMessage={errors['formLineFirst']?.message as string}
											error={!!errors['formLineFirst']}
											touched={!!touchedFields['formLineFirst']}
											infoMessage={t('Label_Profile_EnterAddress') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_Line2')}</div>
									<div>
										<InputBox
											register={register('formLineSecond', {
												onBlur: () => trigger('formLineSecond'),
											})}
											error={!!errors['formLineSecond']}
											touched={!!touchedFields['formLineSecond']}
											infoMessage={t('Label_Profile_EnterAddress') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_City')}</div>
									<div>
										<InputBox
											register={register('formCity', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formCity'),
											})}
											errorMessage={errors['formCity']?.message as string}
											error={!!errors['formCity']}
											touched={!!touchedFields['formCity']}
											infoMessage={t('Label_Profile_EnterCity') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_PostCode')}</div>
									<div>
										<InputBox
											register={register('formPostCode', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formPostCode'),
											})}
											type='number'
											min='0'
											style={{ WebkitAppearance: 'none' }}
											errorMessage={errors['formPostCode']?.message as string}
											error={!!errors['formPostCode']}
											touched={!!touchedFields['formPostCode']}
											infoMessage={t('Label_Profile_EnterPostCode') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_State')}</div>
									<div>
										<InputBox
											register={register('formState', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formState'),
											})}
											errorMessage={errors['formState']?.message as string}
											error={!!errors['formState']}
											touched={!!touchedFields['formState']}
											infoMessage={t('Label_Profile_EnterState') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_Country')}</div>
									<div>
										<InputBox
											register={register('formCountry', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formCountry'),
											})}
											errorMessage={errors['formCountry']?.message as string}
											error={!!errors['formCountry']}
											touched={!!touchedFields['formCountry']}
											infoMessage={t('Label_Profile_EnterCountry') || ''}
										/>
									</div>
								</div>
								<div className='btnGroup'>
									<button type='submit' className='btn-check primary'>
										{t('Label_General_Submit')}
									</button>
								</div>
							</>
						)}
					</div>
				</Form>
			</div>
		</div>
	)
}

export { Address }
