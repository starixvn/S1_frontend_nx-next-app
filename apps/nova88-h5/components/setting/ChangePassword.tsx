/* eslint-disable react/self-closing-comp */ // << 設計的線是使用空div標籤，搭配 className，但 esLint 會報錯，所以先關掉此規則
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useChangePasswordFetcher } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const ChangePassword = () => {
	// ====== hook =====
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher()
	const { register, handleSubmit, formState, reset } = changePasswordForm
	const { errors, touchedFields, isSubmitting, isDirty, isValid } = formState

	// ====== 函數 ======

	const showErrorModal = (message: string) => {
		modal.error(message)
	}

	const showInfoModal = () => {
		modal.info(
			[
				t('Label_ChangePassword_ChangePswUpdateSuccess'),
				t('Label_ChangePassword_ChangePswSuccessHint'),
			] as string[],
			{
				icon: 'icon icon-icon32px_password',
				title: t('Label_General_ChangePassword'),
				onOK: reset,
			}
		)
	}

	return (
		<div className='setting-container'>
			<div className='setting-subtitle'>Change Password</div>
			<div className='setting-tip'>
				Modify the password when logging in, and regular modification is
				beneficial to account security.
			</div>
			<div className='changepassword-content'>
				<div className='resetPassWord'>
					<div className='inputBox-blue error'>
						<input placeholder='Old Password' />
						<div className='iconModule'>
							<i className='icon icon-eye'></i>
							<i className='icon icon-eye-blocked'></i>
							<i className='icon icon-error'></i>
						</div>
					</div>
					<div className='tip active'>Password is required.</div>
				</div>
				<div className='resetPassWord'>
					<div className='inputBox-blue'>
						<input placeholder='New password' />
						<div className='iconModule'>
							<i className='icon icon-eye'></i>
							<i className='icon icon-eye-blocked'></i>
							<i className='icon icon-error'></i>
						</div>
					</div>
					<div className='tip'>Password is required.</div>
				</div>
				<div className='btnGroup'>
					<button className='btn-check'>Submit</button>
				</div>
			</div>
			<div className='bottom-line'></div>
		</div>
	)
}

export { ChangePassword }
