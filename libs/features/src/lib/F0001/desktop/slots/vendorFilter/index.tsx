import { useEffect } from 'react'
import classNames from 'classnames'
import { findIndex } from 'lodash-es'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import VendorItem from './VendorItem'

const VendorFilter = () => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
		setIsActiveDropdown,
	} = useSlots()

	const vendorItemIndex = findIndex(vendorList, {
		tpId: Number(activeVendorTpId),
	})

	useEffect(() => {
		if (vendorItemIndex === -1) return
		// 這裡因為 vendor 沒有做響應式，不會根據視窗大小增減的一排的 vendor，不然不太因該這樣寫
		if (vendorItemIndex > 5) {
			setIsActiveDropdown(true)
		} else {
			setIsActiveDropdown(false)
		}
	}, [activeVendorTpId])

	return (
		<div
			className={`provider ${classNames({
				active: isActiveDropdown,
			})}`}
		>
			<div className='provider-list'>
				{vendorList?.map(({ tpId, openPath, tpName, imgName, displayText }) => (
					<VendorItem
						key={tpId}
						onClick={() =>
							onVendorChange({
								tpId,
								openPath,
							})
						}
						isActive={activeVendorTpId === tpId}
						displayText={displayText}
						imgName={imgName}
					/>
				))}
			</div>
			<button onClick={() => onToggleDropdown()}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/down.png`}
					alt=''
				/>
			</button>
		</div>
	)
}

export default VendorFilter
