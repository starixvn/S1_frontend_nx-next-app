import { useEffect } from 'react'
import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { getQueryParam } from '@nx-next-app/utils'

/**
 *
 * @description 記錄代理優惠資訊
 */
const useAffiliateReferralEffect = ({ expireDay }: { expireDay: number }) => {
	const router = useRouter()

	useEffect(() => {
		const affId = getQueryParam(router.query, 'affId')
		const affCode = getQueryParam(router.query, 'affCode')
		const refId = getQueryParam(router.query, 'refId')
		const aff = getQueryParam(router.query, 'aff')

		const expires = new Date()
		expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000)

		deleteCookie('AffId')
		deleteCookie('RefId')
		deleteCookie('Aff')
		deleteCookie('AffCode')

		if (affId) {
			setCookie('AffId', affId, { expires })
		} else if (refId) {
			setCookie('RefId', refId, { expires })
		} else if (aff) {
			setCookie('Aff', aff, { expires })
		} else if (affCode) {
			setCookie('AffCode', affCode, { expires })
		}
	}, [])
}

export { useAffiliateReferralEffect }
