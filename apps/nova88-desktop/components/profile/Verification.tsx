import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useVerification } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

const Verification = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		userLevelImageInfo,
		safetyLv,
		safetyDisplayKey,
		ALLOWED_CURRENCIES,
		accountName,
		currencyId,
		currencyName,
		emailReward,
		phoneReward,
		phoneVerified,
		emailVerified,
		isLineBinding,
		handleLineBinding,
	} = useVerification()

	// ====== 函數 ======

	/** 提交過程中發生錯誤時，顯示錯誤訊息 */
	const showErrorModal = (message: string) => modal.error(message)

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
							onClick={() => {
								handleLineBinding(showErrorModal)
							}}
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
