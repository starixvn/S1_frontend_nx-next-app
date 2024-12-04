import { Loading } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperProfileH5 } from '@nx-next-app/features/F0001/h5/profile/styles'
import { useSendOTPEmailMutation } from '@nx-next-app/service'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
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
			emailVerified,
			birth_d: birthDay,
			birth_m: birthMonth,
			birth_y: birthYear,
		},
	} = useAuth()

	const [sendOTPEmail] = useSendOTPEmailMutation()

	const onPhoneVerify = () => {
		modal.open(<PhoneOtpModal />)
	}

	const onEmailVerify = async () => {
		try {
			const route = paths.profile.root.slice(1)

			await sendOTPEmail({ route }).unwrap()
			modal.info(t('Label_Profile_EmailOTPHint1'))
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	if (!lastLogin) return <Loading />

	return (
		<WrapperProfileH5>
			<div className='title'>{t('Label_Profile_ShippingAddress')}</div>
			<div className='profile'>
				{phoneNo && (
					<div className='group-control'>
						<div className='label-name'>{t('Label_General_Phone')}</div>
						{phoneNo && (
							<div className='group-cfm'>
								<div className='name-input'>
									({areaCode}){phoneNo}
								</div>

								{phoneVerified ? (
									<span className='icon icon-Shield' />
								) : (
									<button className='btn-secondary' onClick={onPhoneVerify}>
										<i className='icon icon-mobile-alt' />
										<span>{t('Label_Profile_MobileVerifiy')}</span>
									</button>
								)}
							</div>
						)}
					</div>
				)}
				{email && (
					<div className='group-control'>
						<div className='label-name'>{t('Label_General_Email')}</div>
						<div className='group-cfm'>
							<div className='name-input'>{email}</div>
							{emailVerified ? (
								<span className='icon icon-Shield' />
							) : (
								<button className='btn-secondary' onClick={onEmailVerify}>
									<i className='icon icon-mail-line' />
									<span>{t('Label_Profile_EmailVerification')}</span>
								</button>
							)}
						</div>
					</div>
				)}
				{accountName && (
					<div className='group-control'>
						<div className='label-name'>{t('Label_General_RealName')}</div>
						<div className='name-input'>{accountName}</div>
					</div>
				)}
				{birthDay && (
					<div className='group-control'>
						<div className='label-name'>{t('Label_Profile_Birthday')}</div>
						<div className='name-input'>
							{birthDay} / {birthMonth} / {birthYear}
						</div>
					</div>
				)}
				<div className='group-control'>
					<div className='label-name'>{t('Label_General_Username')}</div>
					<div className='name-input'>{userName}</div>
				</div>
				<div className='group-control'>
					<div className='label-name'>{t('Label_Profile_RegisterTime')}</div>
					<div className='name-input'>
						{dayjs(regTime).format('DD/MM/YYYY HH:mm:ss')}
					</div>
				</div>
				<div className='group-control'>
					<div className='label-name'>{t('Label_Profile_LastLogin')}</div>
					<div className='name-input'>
						{dayjs(lastLogin).format('DD/MM/YYYY HH:mm:ss')}
					</div>
				</div>
			</div>
		</WrapperProfileH5>
	)
}

export { Info }
