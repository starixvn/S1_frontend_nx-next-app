import VendorItem from '@nx-next-app/features/F0001/h5/slots/vendorFilter/VendorItem'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const VendorFilter = () => {
	const { vendorList, activeVendorTpId, onVendorChange } = useSlots()

	return (
		<div className='partnerSelect'>
			{vendorList?.map(
				({
					tpId,
					displayText,
					openPath,
					pathRoot,
					tpName,
					imgName,
					...rest
				}) => {
					return (
						<VendorItem
							key={`slot-swiper-${tpId}`}
							item={{
								tpId,
								displayText,
								openPath,
								pathRoot,
								tpName,
								imgName,
								...rest,
							}}
							tpId={tpId}
							displayText={displayText}
							activeVendorTpId={activeVendorTpId}
							onClick={() =>
								onVendorChange({
									tpId,
									openPath,
									isLobby: false,
								})
							}
						/>
					)
				}
			)}
		</div>
	)
}

export default VendorFilter
