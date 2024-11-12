import { IMetaData } from '@nx-next-app/types'
import { useEffect, useState } from 'react'

const siteName = process.env['NEXT_PUBLIC_SITE_NAME'] || ''

export const useSiteMetaData = () => {
	const [metaData, setMetaData] = useState<IMetaData>()

	useEffect(() => {
		const initMetaData = async () => {
			const loadedData = (await import(`../site/${siteName}`)).META_DATA
			setMetaData(loadedData)
		}

		initMetaData()
	}, [])

	return metaData
}

