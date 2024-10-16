import { useSlots } from '@nx-next-app/operations'
import VendorItem from './VendorItem'

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
