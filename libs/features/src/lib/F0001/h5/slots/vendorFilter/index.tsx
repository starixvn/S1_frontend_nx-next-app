import React from 'react'
import { IVendorData } from 'libs/web/src/service/gameApi/type'
import VendorItem from '@nx-next-app/features/F0001/h5/slots/vendorFilter/VendorItem'

interface IVendorFilterProps {
	vendorList: IVendorData[]
	activeVendorTpId?: string | number | null
	onClick: (provider: IVendorData) => void
}

const VendorFilter = ({
	vendorList,
	activeVendorTpId,
	onClick,
}: IVendorFilterProps) => {
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
							onClick={onClick}
						/>
					)
				}
			)}
		</div>
	)
}

export default VendorFilter
