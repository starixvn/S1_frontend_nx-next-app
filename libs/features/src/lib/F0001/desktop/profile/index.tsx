/* eslint-disable jsx-a11y/heading-has-content */
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Spin } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useSetProfileMutation } from '@nx-next-app/service'
import { PrevPageEnum, PREV_PAGE } from '@nx-next-app/constants'
import { PhoneOtpModal } from './PhoneOtpModal'
import { Info } from './Info'
import { Address } from './Address'
import { Verification } from './Verification'

const Profile = () => {
	const { t } = useTranslation()
	const { push, query } = useRouter()
	const { prevPage } = query

	const formMethods = useForm()
	const { getValues, handleSubmit } = formMethods

	const { modal } = useGlobalModal()

	const {
		userInfo: {
			phoneNo,
			areaCode,
			accountName,
			phoneVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
		},
	} = useAuth()

	//* DatePicker 使用 react-hook-form 會有日期更新緩慢的狀況，所以改用 useState
	const [formBirth, setFormBirth] = useState<Date | null>(null)

	const [setProfile] = useSetProfileMutation()

	const handleSubmitForm = () => {
		const setFormProfile = async () => {
			const { formAreaCode, formPhone, formRealName } = getValues()

			try {
				//* 既有的資料依然需要傳進 api
				await setProfile({
					AccountName: accountName ?? formRealName,
					AreaCode: areaCode ?? formAreaCode,
					Birth_d: birthDay ?? dayjs(formBirth).format('DD'),
					Birth_m: birthMonth ?? dayjs(formBirth).format('MM'),
					Birth_y: birthYear ?? dayjs(formBirth).format('YYYY'),
					PhoneNo: phoneNo ?? formPhone,
				})

				if (!phoneVerified) {
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

	const showSubmitBtn = !accountName || !phoneNo || !birthDay

	// * 等待 response 回來才渲染元件，確保不會發生 react-hydration-error
	if (!accountName) return <Spin />

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
					<form onSubmit={handleSubmit(handleSubmitForm)}>
						<div className='profileModule'>
							<Verification />
							<Info formBirth={formBirth} setFormBirth={setFormBirth} />
						</div>
						{showSubmitBtn && (
							<div className='btnGroup'>
								<button className='btn-check' type='submit'>
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
