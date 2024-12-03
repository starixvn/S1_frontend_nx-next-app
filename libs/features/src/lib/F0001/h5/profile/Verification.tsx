import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { WrapperVerificationH5 } from '@nx-next-app/features/F0001/h5/profile/styles'
import { CurrenciesEnum } from '@nx-next-app/types'
import { getSafetyLv, numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const Verification = () => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES, ALLOWED_CURRENCIES } = useStaticData()

	const {
		userInfo: {
			userLevel,
			currencyId,
			emailReward,
			phoneReward,
			accountName,
			currencyName,
			phoneVerified,
			emailVerified,
		},
	} = useAuth()

	const [tipOpenCol, setTipOpenCol] = useState<
		'accountName' | 'email' | 'phone' | undefined
	>()

	const handleTipOpen = ({ col }: { col: 'accountName' | 'email' | 'phone' }) =>
		col === tipOpenCol ? setTipOpenCol(undefined) : setTipOpenCol(col)

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1]

	const phoneVerification = {
		exist: true,
		value: phoneVerified,
	}
	const emailVerification = {
		exist: true,
		value: emailVerified,
	}
	const { safetyLv, safetyDisplayKey } = getSafetyLv({
		phoneVerification,
		emailVerification,
	})
	return (
		<WrapperVerificationH5>
			{userLevelImageInfo?.url ? (
				<div className={`vip_mark ${userLevelImageInfo?.levelTabsName}`}>
					<img src={userLevelImageInfo?.url} alt={userLevelImageInfo?.alt} />
					{includes(
						ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[],
						currencyId
					) && <div>{t(userLevelImageInfo?.displayKey as string)}</div>}
				</div>
			) : (
				<div className='icon icon-member' />
			)}
			<div className='accountSafety'>
				<div>{t('Label_Profile_AccountSafety')}：</div>
				<div>{t(safetyDisplayKey)}</div>
			</div>
			<div className='safetyLv'>
				<span className={classNames({ active: safetyLv >= 1 })} />
				<span className={classNames({ active: safetyLv >= 2 })} />
				<span className={classNames({ active: safetyLv >= 3 })} />
			</div>
			<div className='userVerification'>
				<div>{t('Label_Profile_UserVerification')}：</div>
				<div>
					<div
						className={classNames('icon icon-person', {
							active: accountName,
							openTip: tipOpenCol === 'accountName',
						})}
						onClick={() => handleTipOpen({ col: 'accountName' })}
					>
						<div className='description'>
							<div className='title'>
								{t('Label_Profile_ProfileVerification')}
							</div>
							<div>{t('Label_Profile_ProfileVerificationHint1')}</div>
							<div>({t('Label_Profile_ProfileVerificationHint2')})</div>
						</div>
					</div>
					<div
						className={classNames('icon icon-mail-line', {
							active: emailVerified,
							openTip: tipOpenCol === 'email',
						})}
						onClick={() => handleTipOpen({ col: 'email' })}
					>
						<div className='description'>
							<div className='title'>
								{t('Label_Profile_EmailVerification')}
							</div>
							<div>{t('Label_Profile_EmailVerificationHint1')}</div>
							<div>
								{t('Label_Profile_EmailVerificationHint2', {
									currency: currencyName,
									amount: numberFormat(emailReward ?? 0, currencyId),
								})}
							</div>
						</div>
					</div>
					<div
						className={classNames('icon icon-mobile-alt', {
							active: phoneVerified,
							openTip: tipOpenCol === 'phone',
						})}
						onClick={() => handleTipOpen({ col: 'phone' })}
					>
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
					</div>
				</div>
			</div>
		</WrapperVerificationH5>
	)
}

export { Verification }
