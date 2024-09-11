import { Loading } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useProfileInfo } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { Address } from './Address'
import { Info } from './Info'
import { PhoneOtpModal } from './PhoneOtpModal'
import { Verification } from './Verification'

const Profile = () => {
	// ====== hook ======

	const { t } = useTranslation()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { isLogin, accountName, formMethods, showSubmitBtn, handleSubmitForm } =
		useProfileInfo()

	const { handleSubmit } = formMethods

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

	/** 需要根據 prevPage 進行導向時，顯示跳轉頁面和彈出確認訊息
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

	// 登入檢查
	if (!isLogin) push('/')

	// 等待載入
	if (!accountName) return <Loading />

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_Profile'>
						{t('Label_General_Profile')}
					</span>
					<div>{t('Label_Profile_ProfileModifyWarning')}</div>
				</div>
				<FormProvider {...formMethods}>
					<form
						onSubmit={handleSubmit(() =>
							handleSubmitForm(
								showConfirmModal,
								showErrorModal,
								showPrevPageConfirmModal,
								showProfileModifyWarningModal
							)
						)}
					>
						<div className='profileModule'>
							<Verification />
							<Info />
						</div>
						{showSubmitBtn && (
							<div className='btnGroup'>
								<button className='btn-check primary' type='submit'>
									{t('Label_General_Submit')}
								</button>
							</div>
						)}
					</form>
				</FormProvider>
				<Address />
			</div>
		</div>
	)
}

export default Profile
