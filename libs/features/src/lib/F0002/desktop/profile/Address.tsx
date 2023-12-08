import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useSetProfileAddressMutation } from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { InputBox, Form } from '@nx-next-app/components/D0002'
import { PrevPageEnum, PREV_PAGE } from '@nx-next-app/constants'
import { CurrenciesEnum } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { PhoneOtpModal } from './PhoneOtpModal'

const Address = () => {
	const { t } = useTranslation()
	const { push, query } = useRouter()
	const { prevPage } = query
	const { ALLOWED_CURRENCIES } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { modal } = useGlobalModal()

	const {
		userInfo: {
			addressCity,
			addressState,
			phoneVerified,
			addressCountry,
			addressPostCode,
			addressLineFirst,
			addressLineSecond,
		},
	} = useAuth()

	const { formState, trigger, register, getValues, handleSubmit } = useForm()
	const { errors, touchedFields } = formState

	const [setProfileAddress] = useSetProfileAddressMutation()

	const handleSubmitForm = () => {
		const setAddress = async () => {
			const {
				formCity,
				formState,
				formCountry,
				formPostCode,
				formLineFirst,
				formLineSecond,
			} = getValues()

			try {
				await setProfileAddress({
					AddressCity: formCity,
					AddressState: formState,
					AddressCountry: formCountry,
					AddressPostCode: formPostCode,
					AddressLineFirst: formLineFirst,
					AddressLineSecond: formLineSecond,
				}).unwrap()

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
			onOK: setAddress,
		})
	}

	if (!includes(ALLOWED_CURRENCIES['ADDRESS'] as CurrenciesEnum[], currencyId))
		return null

	return (
		<div className='addressModule'>
			<div className='address-container'>
				<div className='inside-title'>
					<span>
						{t('Label_Profile_ShippingAddress')}({t('Label_Profile_Option2')})
					</span>
					<div>{t('Label_Profile_ShippingHint')}</div>
				</div>
				<div className='sub-title'>{t('Label_Profile_Address')}</div>
				<Form onSubmit={handleSubmit(handleSubmitForm)}>
					<div className='address-list'>
						{addressCountry ? (
							<>
								<div>{addressLineFirst}</div>
								{addressLineSecond && <div>{addressLineSecond}</div>}
								<div>
									{addressCity}, {addressPostCode}
								</div>
								<div>
									{addressState}, {addressCountry}
								</div>
							</>
						) : (
							<>
								<div>
									<div>{t('Label_Profile_Line1')}</div>
									<div>
										<InputBox
											register={register('formLineFirst', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formLineFirst'),
											})}
											errorMessage={errors['formLineFirst']?.message as string}
											error={!!errors['formLineFirst']}
											touched={!!touchedFields['formLineFirst']}
											infoMessage={t('Label_Profile_EnterAddress') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_Line2')}</div>
									<div>
										<InputBox
											register={register('formLineSecond', {
												onBlur: () => trigger('formLineSecond'),
											})}
											error={!!errors['formLineSecond']}
											touched={!!touchedFields['formLineSecond']}
											infoMessage={t('Label_Profile_EnterAddress') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_City')}</div>
									<div>
										<InputBox
											register={register('formCity', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formCity'),
											})}
											errorMessage={errors['formCity']?.message as string}
											error={!!errors['formCity']}
											touched={!!touchedFields['formCity']}
											infoMessage={t('Label_Profile_EnterCity') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_PostCode')}</div>
									<div>
										<InputBox
											register={register('formPostCode', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formPostCode'),
											})}
											type='number'
											min='0'
											style={{ WebkitAppearance: 'none' }}
											errorMessage={errors['formPostCode']?.message as string}
											error={!!errors['formPostCode']}
											touched={!!touchedFields['formPostCode']}
											infoMessage={t('Label_Profile_EnterPostCode') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_State')}</div>
									<div>
										<InputBox
											register={register('formState', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formState'),
											})}
											errorMessage={errors['formState']?.message as string}
											error={!!errors['formState']}
											touched={!!touchedFields['formState']}
											infoMessage={t('Label_Profile_EnterState') || ''}
										/>
									</div>
								</div>
								<div>
									<div>{t('Label_Profile_Country')}</div>
									<div>
										<InputBox
											register={register('formCountry', {
												required: {
													value: true,
													message: t('Label_Profile_ContentNotEmpty'),
												},
												onBlur: () => trigger('formCountry'),
											})}
											errorMessage={errors['formCountry']?.message as string}
											error={!!errors['formCountry']}
											touched={!!touchedFields['formCountry']}
											infoMessage={t('Label_Profile_EnterCountry') || ''}
										/>
									</div>
								</div>
								<div className='btnGroup'>
									<button type='submit' className='btn-check'>
										{t('Label_General_Submit')}
									</button>
								</div>
							</>
						)}
					</div>
				</Form>
			</div>
		</div>
	)
}

export { Address }
