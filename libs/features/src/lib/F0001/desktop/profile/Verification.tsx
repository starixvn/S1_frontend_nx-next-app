import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { getSafetyLv, numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

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
		if (isLineBinding) return // 因按鈕的 disabled 樣式不太適合，所以先在這擋下
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

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1 ?? 0]

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
		<div className='vipLv'>
			<div className='vipbg'>
				{userLevelImageInfo?.url ? (
					<img src={userLevelImageInfo?.url} alt={userLevelImageInfo?.alt} />
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
						className={classNames('icon icon-user-line custom-tooltip', {
							active: accountName,
						})}
					>
						<div className='custom-tooltip-body'>
							<div className='title'>
								{t('Label_Profile_ProfileVerification')}
							</div>
							<div>{t('Label_Profile_ProfileVerificationHint1')}</div>
							<div>({t('Label_Profile_ProfileVerificationHint2')})</div>
						</div>
					</div>
					<div
						className={classNames('icon icon-mail-line custom-tooltip', {
							active: emailVerified,
						})}
					>
						<div className='custom-tooltip-body'>
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
						className={classNames('icon icon-mobile-alt custom-tooltip', {
							active: phoneVerified,
						})}
					>
						<div className='custom-tooltip-body'>
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
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/line-2.png`}
								alt='img-line'
							/>
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
