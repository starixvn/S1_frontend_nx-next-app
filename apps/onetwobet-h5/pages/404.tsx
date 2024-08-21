import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import React, { useLayoutEffect } from 'react'

export default function Page404() {
	const { push } = useRouter()

	// * 404 未找到檔案的路徑時導回首頁
	useLayoutEffect(() => {
		push(paths.home.root)
	}, [])

	return <div>404</div>
}
