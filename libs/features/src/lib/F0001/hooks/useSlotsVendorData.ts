import { useEffect, useState } from 'react'
import { findIndex } from 'lodash-es'
import { useIsFirstRender } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { IVendorData } from 'libs/web/src/service/gameApi/type'

const useSlotsVendorData = ({
	persistProviderList,
}: {
	persistProviderList: IVendorData[]
}) => {
	const { push, query } = useRouter()
	const isFirstRender = useIsFirstRender()

	const [activeVendorTpId, setActiveVendorTpId] = useState<
		number | string | null
	>()
	const [vendorList, setVendorList] = useState<IVendorData[]>(
		persistProviderList as IVendorData[]
	)

	const onVendorChange = ({
		tpId,
		openPath,
	}: {
		tpId: number
		openPath: string
	}) => {
		if (tpId === activeVendorTpId) {
			setActiveVendorTpId(null)

			// * 只改變路徑，不重新渲染畫面
			push({ pathname: paths.slots.root }, undefined, { shallow: true })
		} else {
			setActiveVendorTpId(tpId)
			if (openPath) {
				push(`/${openPath}`)
			} else {
				// * 只改變路徑，不重新渲染畫面
				push({ pathname: paths.slots.root, query: { tpId } }, undefined, {
					shallow: true,
				})
			}
		}
	}

	// * 將 query['tpId'] 找到的 vendor slice 到第一個選項並 selected
	useEffect(() => {
		const targetIndex = findIndex(vendorList, { tpId: Number(query['tpId']) })

		if (targetIndex !== -1 && isFirstRender) {
			const newVendorList = [
				...vendorList.slice(targetIndex),
				...vendorList.slice(0, targetIndex),
			]
			setVendorList(newVendorList)
			setActiveVendorTpId(vendorList[targetIndex].tpId)
		}
	}, [isFirstRender])

	return { vendorList, activeVendorTpId, onVendorChange }
}

export { useSlotsVendorData }
