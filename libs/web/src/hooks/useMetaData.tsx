import { ISEOData, useAuth, useStaticData } from '@nx-next-app/data-access'
import { isNull, replace } from 'lodash-es'
import { useRouter } from 'next/router'
import { paths } from '../app/constants/paths'

/**
 *
 * @param persistSEOData
 * @returns 回傳 server-side 資料或基本默認的 metadata
 */
const useMetaData = (persistSEOData: ISEOData) => {
	const { pathname } = useRouter()
	const { META_DATA } = useStaticData()

	const {
		userInfo: { langId },
	} = useAuth()

	const metaDataByLang =
		(META_DATA?.[replace(pathname, '/', '')]
			? META_DATA?.[replace(pathname, '/', '')]
			: META_DATA?.[paths.home.root])?.[langId] ?? {}

	const metadata = {
		...metaDataByLang,
		...(!isNull(persistSEOData?.title) ? persistSEOData : {}),
	}

	return metadata
}

export { useMetaData }
