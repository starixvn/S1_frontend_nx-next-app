import { useTranslation } from 'next-i18next'
import { PHONE_DIGITS_LIMIT, PHONE_LENGTH_REGEX } from '@nx-next-app/constants'

const useCheckPhone = () => {
	const { t } = useTranslation()

	const handlePhoneErrorTip = ({
		phoneError,
		formAreaCode,
		formPhone,
	}: {
		phoneError?: string
		formAreaCode?: string
		formPhone: string
	}) => {
		let errorTip = ''

		if (phoneError) {
			errorTip = phoneError
		} else if (!formAreaCode) {
			errorTip = t('Label_Join_PhoneRequired')
		} else if (!PHONE_LENGTH_REGEX.test(formAreaCode + formPhone)) {
			// phone number check length by area code, so can't use pattern
			const limitRange = PHONE_DIGITS_LIMIT[formAreaCode]
			errorTip = t('Label_Join_PhoneNumberErrorTip', {
				digitalArea: limitRange,
			})
		}

		return errorTip
	}

	return { handlePhoneErrorTip }
}

export { useCheckPhone }
