import React from 'react'
import VendorItem from '@nx-next-app/features/F0006/h5/slots/vendorFilter/VendorItem'
import { useSlots } from '@nx-next-app/features/F0006/providers'

const VendorFilter = () => {
	const { vendorList, activeVendorTpId, onVendorChange } = useSlots()
	return (
		<div className='partnerSelect'>
			{vendorList?.map(
				({ tpId, displayText, openPath, tpName, imgName, ...rest }) => {
					return (
						<VendorItem
							key={`slot-swiper-${tpId}`}
							item={{
								tpId,
								displayText,
								openPath,
								tpName,
								imgName,
								...rest,
							}}
							tpId={tpId}
							displayText={displayText}
							activeVendorTpId={activeVendorTpId}
							onClick={onVendorChange}
						/>
					)
				}
			)}
		</div>
	)
}

export default VendorFilter
