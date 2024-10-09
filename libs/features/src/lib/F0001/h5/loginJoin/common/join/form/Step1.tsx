import { InputBox, ISelectProps } from '@nx-next-app/components/H0001'
import {
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	PASSWORD_REGEX,
	REALNAME_REGEX,
	USERNAME_REGEX,
} from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	useLazyAffiliateCheckQuery,
	useLazyExistsUserNameQuery,
} from '@nx-next-app/service'
import classNames from 'classnames'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

interface IStep1Props {
	cookies: TmpCookiesObj
	siteCurrencyList: number[]
	setStep: (step: number) => void
	selectCurrency: (newCurrencyId: ISelectProps['value']) => void
	setCurrencyOptions: (options: ISelectProps['options']) => void
}

const Step1 = ({
	cookies,
	siteCurrencyList,
	setStep,
	selectCurrency,
	setCurrencyOptions,
}: IStep1Props) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { query } = router

	const { TERMS_CONDITIONS } = useStaticData()
	const {
		userInfo: { langId },
	} = useAuth()

	const urlAffId = query['AffId'] || cookies['AffId']
	const urlAffCode = query['AffCode'] || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode

	const {
		formState,
		trigger,
		register,
		setError,
		getValues,
		clearErrors,
		getFieldState,
	} = useFormContext()
	const { errors, touchedFields } = formState

	const [affiliateCheck] = useLazyAffiliateCheckQuery()
	const [checkExistsUsername] = useLazyExistsUserNameQuery()

	const checkUsername = async () => {
		await trigger('username')
		const { error } = getFieldState('username')
		const username = getValues('username')
		if (error) return false

		// check username duplicate from api
		try {
			const { data: isExistsUsername, message: existsUsernameMsg } =
				await checkExistsUsername({ username, langId }).unwrap()

			if (isExistsUsername) {
				setError('username', { type: 'duplicate', message: existsUsernameMsg })
			}
		} catch (error) {
			// error
		}

		return true
	}

	const checkConfirmPwd = async () => {
		await trigger('confirmPwd')
		const { error } = getFieldState('confirmPwd')
		const formConfirmPwd = getValues('confirmPwd')
		const formPassword = getValues('password')
		if (error) return false

		if (formConfirmPwd !== formPassword) {
			setError('confirmPwd', {
				type: 'mismatch',
				message: t('Label_Join_ConfirmPwdNotMatch') || '',
			})
		}

		return true
	}

	const checkAffiliate = async () => {
		const formAffiliate = getValues('affiliate')
		if (!formAffiliate || urlAffiliate) return true

		// check affiliate is qualified from api
		try {
			const { data: affCurrencyId } = await affiliateCheck({
				affCode: formAffiliate,
			}).unwrap()

			if (Number(affCurrencyId)) {
				selectCurrency(Number(affCurrencyId))

				const options = siteCurrencyList
					.filter(currencyId => currencyId === Number(affCurrencyId))
					.map(currencyId => ({
						value: currencyId,
						label: t(`Label_General_Currency_${currencyId}`),
						prefixOptionIcon: (
							<div
								className={classNames(
									'flag',
									FLAG_PREFIX_ICON_BY_CURRENCIES[currencyId]
								)}
							/>
						),
					}))

				setCurrencyOptions(options)
			}

			clearErrors('affiliate')
			return true
		} catch (error) {
			// error
			setError('affiliate', {
				type: 'invalid',
				message: t('Label_Join_AffiliateIdWrong') || '',
			})
			return false
		}
	}

	const handleSubmitStep1 = async () => {
		// because cannot use react-hook-form handleSubmit ,so need to check independently
		const [usernameCheck, passwordCheck, confirmPwdCheck, realNameCheck] =
			await Promise.all([
				checkUsername(),
				trigger('password'),
				checkConfirmPwd(),
				trigger('realName'),
			])

		if (!usernameCheck || !passwordCheck || !confirmPwdCheck || !realNameCheck)
			return

		// affiliate should be qualified or empty
		let affiliateCheck = true
		const { affiliate } = getValues()

		if (affiliate) {
			affiliateCheck = await checkAffiliate()
		}

		if (affiliateCheck) setStep(2)
	}

	return (
		<>
			<InputBox
				register={register('username', {
					required: { value: true, message: t('Label_General_UsernameReq') },
					pattern: {
						value: USERNAME_REGEX,
						message: t('Label_General_UserNameLength') || '',
					},
					onBlur: checkUsername,
				})}
				icon='icon-member txt-blue'
				placeholder={t('Label_General_Username') || ''}
				errorMessage={errors['username']?.message as string}
				error={!!errors['username']}
				touched={!!touchedFields['username']}
				infoMessage={t('Label_Join_UsernameTooltip') || ''}
			/>
			<InputBox
				register={register('password', {
					required: {
						value: true,
						message: t('Label_General_PasswordRequired'),
					},
					pattern: {
						value: PASSWORD_REGEX,
						message: t('Label_General_PasswordValidate') || '',
					},
					onBlur: () => trigger('password'),
				})}
				password
				icon='icon icon-key txt-blue'
				placeholder={t('Label_General_Password') || ''}
				errorMessage={errors['password']?.message as string}
				error={!!errors['password']}
				touched={!!touchedFields['password']}
			/>
			<InputBox
				register={register('confirmPwd', {
					required: { value: true, message: t('Label_Join_ConfirmPwdReq') },
					onBlur: checkConfirmPwd,
				})}
				password
				icon='icon icon-key txt-blue'
				placeholder={t('Label_Join_ConfirmPassword') || ''}
				errorMessage={errors['confirmPwd']?.message as string}
				error={!!errors['confirmPwd']}
				touched={!!touchedFields['confirmPwd']}
			/>
			<InputBox
				register={register('realName', {
					required: { value: true, message: t('Label_Join_RealNameReq') },
					pattern: {
						value: REALNAME_REGEX,
						message: t('Label_Join_EnterRealName') || '',
					},
					onBlur: () => trigger('realName'),
				})}
				icon='icon-member txt-blue'
				placeholder={t('Label_General_RealName') as string}
				errorMessage={errors['realName']?.message as string}
				error={!!errors['realName']}
				touched={!!touchedFields['realName']}
				infoMessage={t('Label_General_RemindForName') as string}
			/>
			<InputBox
				register={register('affiliate', {
					onBlur: checkAffiliate,
				})}
				icon='icon icon-affiliate txt-blue'
				placeholder={t('Label_Join_Affiliate_ID') as string}
				errorMessage={errors['affiliate']?.message as string}
				error={!!errors['affiliate']}
				touched={!!touchedFields['affiliate']}
				infoMessage={t('Label_Join_Please_Enter_Affiliate_ID') as string}
				// If has url affiliate and has value in affiliate input, the affiliate is qualified.
				readOnly={!!urlAffiliate && !!getValues('affiliate')}
			/>
			<div className='Terms'>
				{t('Label_Join_SignUpTerms1')} &nbsp;
				<a
					rel='noreferrer'
					target='_blank'
					href={TERMS_CONDITIONS({ langId: 'en' })['TermsConditions']}
				>
					{t('Label_Join_SignUpTerms2')}
				</a>
				{t('Label_Join_SignUpTerms3')}
			</div>
			<div className='btn-group'>
				<button type='button' onClick={handleSubmitStep1}>
					{t('Label_General_Join')}
				</button>
			</div>
		</>
	)
}

export { Step1 }
