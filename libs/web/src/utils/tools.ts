import { CurrenciesEnum } from '@nx-next-app/types'
import dayjs from 'dayjs'
import { find } from 'lodash-es'
import { TpMaintainData } from '../service/siteApi/type'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const openLiveChat = () =>
	(window as any).LiveChatWidget.call('maximize')

// 多重比對 , 可用在條件渲染時  A = B | C | D 時顯示
// 第一個參數放 value 第二個放 條件 使用 Array 把所有該條件的參數放進 Array
/**
 * @values 條件
 * @others 比對值
 * @example multiEqual(1, [1, 2, 3]) // true
 * @example multiEqual(actionMode , [BannerActionEnum.GoToBonus , BannerActionEnum.RedirectPageOfThisSite])
 */
export const multiEqual = <T>(value: T, others: Array<T>): boolean => {
	for (let i = 0; i <= others.length - 1; i += 1) {
		if (others[i] === value) {
			return true
		}
	}
	return false
}

/**
 @description 判斷是否為合法 url
 @description用途：當前測試環境很多不合法的 url，會導致Next Image 元件整個爆掉
  */
export const isUrl = (url: string): boolean => {
	// eslint-disable-next-line prefer-regex-literals
	const regexp = new RegExp(/^(http:|https:)/gi)
	return regexp.test(url)
}

export const onWindowOpen = (
	url?: string | URL | undefined,
	target?: string | undefined,
	features?: string | undefined
) => typeof window !== undefined && window.open(url, target, features)

export const onWindowOpenProduct = ({
	pathname,
	windowKey,
}: {
	pathname: string
	windowKey: string
}) => {
	if (typeof window !== `undefined`) {
		// detect safari browser
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		if (isSafari) {
			const popup = window.open('', windowKey, 'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0');

			if (popup && !popup.closed) {
				popup.close();
			}
		}
		window
			.open(
				pathname,
				windowKey,
				'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0'
			)
			?.focus()
	}
}

/**
 * 判斷f是否處於活動時間
 */
export const isEventPeriod = (period: {
	start: null | string
	end: null | string
}) => {
	const { start, end } = period

	// * 如果只有 start，只判斷是否結束
	if (start && !end) {
		return dayjs().isAfter(dayjs(start))
	}

	// * 如果只有 end，只回傳是否結束
	if (!start && end) {
		return dayjs().isBefore(dayjs(end))
	}

	// * 如果兩者都有，兩個比較值都回傳
	if (start && end) {
		return dayjs().isAfter(dayjs(start)) && dayjs().isBefore(dayjs(end))
	}

	return true
}

/**
 * @returns string
 * @description 回傳 TERMS & CONDITIONS的語系
 * ```tsx
 * getTermsConditionsLangId({ langId: 'en', currencyId: 15}) // id_en
 * getTermsConditionsLangId({ langId: 'cs', currencyId: 15}) // cs
 * ```
 */
export const getTermsConditionsLangId = ({
	langId,
	currencyId,
}: {
	langId: string
	currencyId: number
}) => {
	if (langId === 'en') {
		if (currencyId === CurrenciesEnum.THB) {
			return 'th_en'
		}
		if (currencyId === CurrenciesEnum.IDR) {
			return 'id_en'
		}
		if (currencyId === CurrenciesEnum.VND) {
			return 'vn_en'
		}
	}
	return langId
}

export const getIsTpMaintain = ({
	tpMaintainList,
	tpId,
	tpGameType,
}: {
	tpMaintainList: TpMaintainData[]
	tpId: number | undefined
	tpGameType: number | null | undefined
}): boolean => {
	const tpMaintain = find(tpMaintainList, { tpId })

	const isTpMaintain =
		tpMaintain &&
		(tpMaintain?.tpGameType === 0 || // * 0:代表全部
			tpMaintain?.tpGameType === tpGameType)

	return Boolean(isTpMaintain)
}

export const transferDirection = ({
	direction,
	displayMainWallet,
	displayAdjustment,
	isAdjustment,
	tpName,
}: {
	direction: number
	displayMainWallet: string
	displayAdjustment: string
	isAdjustment: boolean
	tpName: string
}) => {
	const startWallet =
		direction === 1 && !isAdjustment ? displayMainWallet : tpName
	let endWallet = ''

	if (isAdjustment) {
		endWallet = displayAdjustment
	} else {
		endWallet = direction === 1 ? tpName : displayMainWallet
	}

	return { startWallet, endWallet }
}

/**
 * secondsToTime(60) // 01:00
 * @returns 秒數轉乘分鐘數
 */
export const secondsToTime = (secondsInTime: number) => {
	const pad = (num: number, size: number) => `000${num}`.slice(size * -1)
	const time = parseFloat(String(secondsInTime)).toFixed(3)
	const minutes = Math.floor(Number(time) / 60) % 60
	const seconds = Math.floor(Number(time) - minutes * 60)
	return `${pad(minutes, 2)}:${pad(seconds, 2)}`
}

export const scrollToTop = () => {
	window !== undefined && window.scrollTo({ top: 0, behavior: 'smooth' })
}
