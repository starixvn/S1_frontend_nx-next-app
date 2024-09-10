// CRM 系統 Optimove 的所有事件 trigger 寫在此處，因為事件較多，獨立拉一隻檔案撰寫

// OptimoveSDK 的 3方物件巢狀長，照之前寫法判斷式要寫很長，先把 type 定義直接寫進 global
interface OptimoveSDK {
	API: {
		setPageVisit: (
			pageUrl: string,
			pageTitle: string,
			category?: string | null,
			sdkId?: string | null
		) => void
	}
}

declare global {
	interface Window {
		optimoveSDK?: OptimoveSDK
	}
}

/**
 * 頁面訪問事件，在每一頁均需推送此事件，category 目前暫時沒有編列，custId 填入與否取決於是否登入，若登入則帶入 custId
 *
 * @param {string} category - 當前 category , 目前站內沒有明確區分，待編列
 * @param {string} custId - custId , 有登入時帶入此項供 Optimove 判斷使用者資訊
 */
export const OptimovePageVisitEvent = (
	category: string | null,
	custId: string | null
) => {
	if (window !== undefined && window.optimoveSDK !== undefined) {
		const { protocol } = window.location
		const { host } = window.location
		const path: string = window.location.pathname
		const query: string = window.location.search

		// 他們要求要 full url
		const pageUrl = `${protocol}//${host}${path}${query}`
		const pageTitle: string = document.title
		if (pageTitle !== undefined) {
			window.optimoveSDK.API.setPageVisit(pageUrl, pageTitle, category, custId)
		}
	}
}
