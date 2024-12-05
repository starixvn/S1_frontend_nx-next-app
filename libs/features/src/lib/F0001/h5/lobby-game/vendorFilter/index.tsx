import { VendorFilterContainer } from "@nx-next-app/features/F0001/h5/lobby-game/vendorFilter/styles";
import VendorItem from "@nx-next-app/features/F0001/h5/slots/vendorFilter/VendorItem";
import { useLobby } from "@nx-next-app/features/F0001/providers";

const VendorFilter = () => {
	const { vendorList, activeVendorTpId, onVendorChange } = useLobby()

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
							onClick={onVendorChange}
						/>
					)
				}
			)}
		</VendorFilterContainer>
	)
}

export default VendorFilter
