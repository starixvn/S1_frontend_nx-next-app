import { useCheckResetPwdTokenMutation } from '@nx-next-app/service'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useResetPasswordEffect = (callback: () => void) => {
	const { query, push, pathname } = useRouter()
	const [checkResetPwdToken] = useCheckResetPwdTokenMutation()

	useEffect(() => {
		const { reset_password: key, ...queryWithoutKey } = query
		if (key === undefined) return

		push({ pathname, query: queryWithoutKey }, undefined, { shallow: true })

		const formData = new FormData()
		formData.append('key', String(key))

		checkResetPwdToken(formData).unwrap().then(callback)
	}, [query['reset_password']])
}

export { useResetPasswordEffect }
