import { Loading } from '@12b-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import { useProfileInfo } from '@nx-next-app/operations'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { PhoneOtpModal } from '../modal/PhoneOtpModal'

const Info = () => {
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
			phoneVerified,
			emailVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
			accountName,
		},
	} = useAuth()

	const { onEmailVerify } = useProfileInfo()

	// ====== 函數 ======

	/**
	 * 顯示電話驗證的彈出視窗
	 * 當用戶點擊驗證電話時，調用該函數來打開 PhoneOtpModal */
	const showPhoneOtpModal = () => modal.open(<PhoneOtpModal />)
	/**
	 * 顯示郵件驗證的提示信息
	 * 當用戶成功請求 OTP 郵件後，顯示通知提示郵件已發送 */
	const showInfoModal = () => modal.info(t('Label_Profile_EmailOTPHint1'))

	/**
	 * 處理錯誤並顯示錯誤信息
	 * 當發生錯誤時，會將錯誤訊息通過 modal 顯示給使用者
	 * @message - 錯誤訊息 */
	const showErrorModal = (message: string) => modal.error(message)

	if (!lastLogin) return <Loading />

	return (
		<div className='profile'>
			{phoneNo && (
				<div>
					<div>{t('Label_General_Phone')}</div>
					{phoneNo && (
						<div>
							({areaCode}){phoneNo}
							{phoneVerified ? (
								<span className='icon icon-Shield' />
							) : (
								<button
									className='icon btn-org icon-mobile'
									onClick={showPhoneOtpModal}
								>
									<span>{t('Label_Profile_MobileVerifiy')}</span>
								</button>
							)}
						</div>
					)}
				</div>
			)}
			{email && (
				<div>
					<div>{t('Label_General_Email')}</div>
					<div>
						{email}
						{emailVerified ? (
							<span className='icon icon-Shield' />
						) : (
							<button
								className='icon btn-org icon-envelope'
								onClick={() => {
									onEmailVerify(showInfoModal, showErrorModal)
								}}
							>
								<span>{t('Label_Profile_EmailVerification')}</span>
							</button>
						)}
					</div>
				</div>
			)}
			{accountName && (
				<div>
					<div>{t('Label_General_RealName')}</div>
					<div>{accountName}</div>
				</div>
			)}
			{birthDay && (
				<div>
					<div>{t('Label_Profile_Birthday')}</div>
					<div>
						{birthDay} / {birthMonth} / {birthYear}
					</div>
				</div>
			)}
			<div>
				<div>{t('Label_General_Username')}</div>
				<div>{userName}</div>
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
