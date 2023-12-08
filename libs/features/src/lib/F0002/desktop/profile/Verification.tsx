import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import { numberFormat, getSafetyLv } from '@nx-next-app/utils'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CurrenciesEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

const Verification = () => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()
	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

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
			isLineBinding,
		},
	} = useAuth()

	const [getLineLoginDirectUrl] = useLazyGetLineLoginDirectUrlQuery()

	const handleLineBinding = async () => {
		try {
			const { data: lineLoginDirectUrl } = await getLineLoginDirectUrl({
				type: LineLoginDirectTypeEnum.Binding,
			}).unwrap()

			if (lineLoginDirectUrl) {
				window.location.href = lineLoginDirectUrl
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const userLevelImageInfo = VIP_CLUB_IMAGES(DeviceTypeEnum.Desktop)[
		(userLevel as number) - 1 ?? 0
	]

	const { safetyLv, safetyDisplayKey } = getSafetyLv({
		accountName,
		phoneVerified,
		emailVerified,
	})

	return (
		<div className='vipLv'>
			<div className='vipbg'>
				{userLevelImageInfo?.url ? (
					<Image
						src={userLevelImageInfo?.url}
						alt={userLevelImageInfo?.alt}
						width={150}
						height={127}
					/>
				) : (
					<div className='icon icon-member' />
				)}
			</div>
			{includes(ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[], currencyId) && (
				<div className='vipname'>
					{t(userLevelImageInfo?.displayKey as string)}
				</div>
			)}
			<div className='accountSafety'>
				<div>{t('Label_Profile_AccountSafety')}:</div>&nbsp;
				<div>{t(safetyDisplayKey)}</div>
			</div>
			<div className='safetyLv'>
				<span className={classNames({ active: safetyLv >= 1 })} />
				<span className={classNames({ active: safetyLv >= 2 })} />
				<span className={classNames({ active: safetyLv >= 3 })} />
			</div>
			<div className='userVerification'>
				<div>{t('Label_Profile_UserVerification')}:</div>
				<div>
					<div
						className={classNames('icon icon-person', { active: accountName })}
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
						className={classNames('icon icon-email', { active: emailVerified })}
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
						className={classNames('icon icon-mobile', {
							active: phoneVerified,
						})}
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
			{currencyId === CurrenciesEnum.THB && (
				<>
					<div className='btnGroup'>
						<button
							type='button'
							className={classNames('btn-line', { active: isLineBinding })}
							onClick={handleLineBinding}
						>
							<i className='icon icon-line-bold' />
							{isLineBinding
								? t('Label_Profile_Connected')
								: t('Label_Profile_Connect')}
						</button>
					</div>
					{!isLineBinding && (
						<div className='txt-line'>{t('Label_Profile_LinkLineAccount')}</div>
					)}
				</>
			)}
		</div>
	)
}

export { Verification }
