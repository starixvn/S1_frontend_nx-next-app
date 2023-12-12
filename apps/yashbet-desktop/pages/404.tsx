import { paths } from '@nx-next-app/constants'
import React from 'react'

export default function Page404() {
	return <div>404</div>
}

// * 404 未找到檔案的路徑時導回 首頁
export async function getStaticProps() {
	return {
		redirect: {
			destination: paths.home.root,
		},
	}
}
