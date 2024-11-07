import { paths } from '@nx-next-app/constants'
import { ISEOData, useAuth, useStaticData } from '@nx-next-app/data-access'
import { isNull } from 'lodash-es'
import { useRouter } from 'next/router'

/**
 *
 * @param persistSEOData
 * @returns 回傳 server-side 資料或基本默認的 metadata，頁面無資料用首頁資料
 */
const useMetaData = (persistSEOData: ISEOData) => {
	const { pathname } = useRouter()
	const { META_DATA } = useStaticData()

	const {
		userInfo: { langId },
	} = useAuth()

	const metaDataHomeByLang = META_DATA?.[paths.home.root]?.[langId]

	const metaDataPageByLang = META_DATA?.[pathname]?.[langId]

	const metadata = {
		...metaDataHomeByLang,
		...metaDataPageByLang,
		...(!isNull(persistSEOData?.title) ? persistSEOData : {}),
	}

	return metadata
}

export { useMetaData }
