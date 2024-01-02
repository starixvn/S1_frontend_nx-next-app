import { isNaN } from 'lodash-es'
import { numFormatToDigits } from './format'

/**
 * @returns string
 * @description GetVipBanner response 裡有參雜 string number 故須額外判斷與顯示(轉 Number 時是數字會加上千分位，字串直接印出)
 * ```tsx
 * numberFormatExcludeString("Unlimited") // "Unlimited"
 * numberFormat("2000.0000") // 2,000
 * numberFormat("50.00") // 50
 * numberFormat(null) // null
 * ```
 */
export const numberFormatExcludeString = (
	input: number | string | undefined
) => {
	if (!isNaN(Number(input))) {
		return numFormatToDigits(Number(input), 0)
	}

	return input
}
