import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { Loading } from '@nx-next-app/components/D0006'
import { PhoneOtpModal } from './PhoneOtpModal'

const Info = () => {
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
			accountName,
			phoneVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
		},
	} = useAuth()

	const onPhoneVerify = () => {
		modal.open(<PhoneOtpModal />)
	}

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
									onClick={onPhoneVerify}
								>
									<span>{t('Label_Profile_MobileVerifiy')}</span>
								</button>
							)}
						</div>
					)}
				</div>
			)}
			<div>
				<div>{t('Label_General_Email')}</div>
				{!!email && <div>{email}</div>}
			</div>
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
