import { useEffect } from 'react'
import { deleteCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

/**
 *
 * @description 記錄代理優惠資訊
 */
const useAffiliateReferralEffect = ({ expireDay }: { expireDay: number }) => {
	const router = useRouter()

	useEffect(() => {
		const { AffId, RefId, Aff, AffCode } = router.query
		const expires = new Date()
		expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000)

		deleteCookie('AffId')
		deleteCookie('RefId')
		deleteCookie('Aff')
		deleteCookie('AffCode')

		if (AffId) {
			setCookie('AffId', AffId, { expires })
		} else if (RefId) {
			setCookie('RefId', RefId, { expires })
		} else if (Aff) {
			setCookie('Aff', Aff, { expires })
		} else if (AffCode) {
			setCookie('AffCode', AffCode, { expires })
		}
	}, [])
}

export { useAffiliateReferralEffect }
