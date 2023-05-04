import { FieldErrors } from 'react-hook-form'

export const numberFormatter = new Intl.NumberFormat('en', {
	maximumFractionDigits: 0,
	minimumFractionDigits: 0,
})

/**
 * Input: 
 * 
 * {
		password: { type: 'required', message: 'Password is required.' },
		userName: { type: 'required', message: 'Username is required.' },
	}
 *	
 * Output: ['Username is required.', 'Password is required.']
 * 
 * * @example modal.info(renderFieldError(errors))
 */

export const renderFieldErrors = (errors: FieldErrors = {}): string[] => {
	const result = Object.keys(errors).map(key => `${errors[key]?.message}` || '')

	return result
}

/**
 * Input: 
 * 
 * {
		password: { type: 'required', message: 'Password is required.' },
		userName: { type: 'required', message: 'Username is required.' },
	}
 *	
 * Output: 'Username is required.'
 * 
 * * @example modal.info(renderFieldError(errors))
 */

export const renderFieldError = (errors: FieldErrors = {}): string => {
	const result = Object.keys(errors).map(key => `${errors[key]?.message}` || '')

	return result[0]
}
