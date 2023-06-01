import { FieldErrors } from 'react-hook-form'

/**
 * @returns 數字 format 到特定小數點，預設為第二位
 */
export const numFormatToDigits = (value: number, digits = 2): string => {
	const formatter = new Intl.NumberFormat('en', {
		minimumFractionDigits: digits,
	})
	return formatter.format(Number(value.toFixed(digits)))
}

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
