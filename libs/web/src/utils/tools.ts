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
	const regexp = new RegExp(/^(http:|https:)/gi)
	return regexp.test(url)
}
