import { Form, InputBox } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PREV_PAGE, PrevPageEnum } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useSetProfileAddressMutation } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { WrapperEditAddressH5 } from '@nx-next-app/features/F0001/h5/profile/styles'
import { PhoneOtpModal } from './PhoneOtpModal'

const AddressEdit = () => {
	const { t } = useTranslation()

	const { formState, trigger, register, getValues, handleSubmit } = useForm()
	const { errors, touchedFields } = formState

	const { push, query } = useRouter()
	const { prevPage } = query

	const { modal } = useGlobalModal()

	const {
		userInfo: { addressCity, phoneVerified, currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()

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
					modal.confirm(<div>{t('Label_Profile_VertifyContactConfirm')}</div>, {
						icon: 'icon icon-notifi icon-notification-active',
						title: t('Label_General_UpdateSuccessful'),
						okText: t('Label_Profile_VertifyNow'),
						cancelText: t('Label_Profile_Later'),
						onOK: () => modal.open(<PhoneOtpModal />),
					})
				} else if (prevPage) {
					const { path, contentKey, submitKey } =
						PREV_PAGE[prevPage as PrevPageEnum]

					modal.confirm(t(contentKey), {
						icon: 'icon icon-notifi icon-notification-active',
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
			icon: 'icon icon-notifi icon-notification-active',
			title: t('Label_General_ImportantNotes'),
			okText: t('Label_General_Confirm'),
			cancelText: t('Label_Profile_ReModify'),
			onOK: setAddress,
		})
	}

	if (!includes(ALLOWED_CURRENCIES['ADDRESS'] as CurrenciesEnum[], currencyId))
		return null

	if (addressCity) return null

	return (
		<WrapperEditAddressH5>
			<div className='addressModule'>
				{/* <div className='title'>
					{t('Label_Profile_ShippingAddress')}:（{t('Label_Profile_Option2')}）
				</div> */}
				<div className='group-sub-title'>
					<div className='heading-box'>{t('Label_Profile_Address')}</div>
					<div className='body-box'>
						<Form onSubmit={handleSubmit(handleSubmitForm)}>
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
								subtitle={t('Label_Profile_Line1') || ''}
							/>
							<InputBox
								register={register('formLineSecond', {
									onBlur: () => trigger('formLineSecond'),
								})}
								error={!!errors['formLineSecond']}
								touched={!!touchedFields['formLineSecond']}
								infoMessage={t('Label_Profile_EnterAddress') || ''}
								subtitle={t('Label_Profile_Line2') || ''}
							/>
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
								subtitle={t('Label_Profile_City') || ''}
							/>
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
								subtitle={t('Label_Profile_PostCode') || ''}
							/>
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
								subtitle={t('Label_Profile_State') || ''}
							/>
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
								subtitle={t('Label_Profile_Country') || ''}
							/>
							<div className='btn-group'>
								<button type='submit' className='btn-primary'>
									{t('Label_General_Submit')}
								</button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</WrapperEditAddressH5>
	)
}

export { AddressEdit }
