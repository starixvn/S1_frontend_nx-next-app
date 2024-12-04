import { useAuth } from '@nx-next-app/data-access'
import { WrapperProfileH5 } from '@nx-next-app/features/F0001/h5/profile/styles'
import { useTranslation } from 'next-i18next'

const Address = () => {
	const { t } = useTranslation()

	const {
		userInfo: {
			addressCity,
			addressState,
			addressCountry,
			addressPostCode,
			addressLineFirst,
			addressLineSecond,
		},
	} = useAuth()

	if (!addressCity) return null

	return (
		<WrapperProfileH5>
			<div className='title'>
				{t('Label_Profile_ShippingAddress')}:（{t('Label_Profile_Option2')}）
			</div>
			<div className='addressModule'>
				<div className='subtitle'>{t('Label_Profile_Address')}</div>
				<div className='addressContent'>
					<div>{addressLineFirst}</div>
					{addressLineSecond && <div>{addressLineSecond}</div>}
					<div>
						{addressCity}, {addressPostCode}
					</div>
					<div>
						{addressState}, {addressCountry}
					</div>
				</div>
			</div>
		</WrapperProfileH5>
	)
}

export { Address }
