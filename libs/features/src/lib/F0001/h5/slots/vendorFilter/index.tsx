import { VendorFilterContainer } from '@nx-next-app/features/F0001/h5/lobby-game/vendorFilter/styles'
import VendorItem from '@nx-next-app/features/F0001/h5/slots/vendorFilter/VendorItem'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const VendorFilter = () => {
	const { vendorList, activeVendorTpId, onVendorChange } = useSlots()

	return (
		<VendorFilterContainer>
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
              isActive={activeVendorTpId === tpId}
							displayText={displayText}
							imgName={imgName}
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
		</VendorFilterContainer>
	)
}

export default VendorFilter
