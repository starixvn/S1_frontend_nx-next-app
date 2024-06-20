import { useEffect } from 'react'
import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { some } from 'lodash'

/**
 *
 * @description 記錄代理優惠資訊
 */
const useAffiliateReferralEffect = ({ expireDay }: { expireDay: number }) => {
	const router = useRouter()

	useEffect(() => {
		const { affId, affCode, refId, aff } = router.query

		if (!some([affId, affCode, refId, aff], Boolean)) {
			return
		}

		const expires = new Date()
		expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000)

		deleteCookie('AffId')
		deleteCookie('RefId')
		deleteCookie('Aff')
		deleteCookie('AffCode')

		if (affId) setCookie('AffId', affId, { expires })
		if (refId) setCookie('RefId', refId, { expires })
		if (aff) setCookie('Aff', aff, { expires })
		if (affCode) setCookie('AffCode', affCode, { expires })
	}, [])
}

export { useAffiliateReferralEffect }
