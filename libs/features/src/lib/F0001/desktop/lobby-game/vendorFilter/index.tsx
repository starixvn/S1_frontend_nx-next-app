import { VendorFilterContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter/styles";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import classNames from "classnames";

import VendorItem from "./VendorItem";

const VendorFilter = () => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
	} = useLobby()

	return (
		<VendorFilterContainer
			className={`${classNames({
				active: isActiveDropdown,
			})}`}
		>
			<div className='provider-list'>
				{vendorList?.map(({ tpId, openPath, tpName, imgName, displayText }) => (
					<VendorItem
						key={`lobby-vendor-${tpId}`}
						onClick={() =>
							onVendorChange({
								tpId,
								openPath,
								isLobby: true,
							})
						}
						isActive={activeVendorTpId === tpId}
						displayText={displayText}
						imgName={imgName}
					/>
				))}
			</div>
			<button className='btn-toggle' onClick={() => onToggleDropdown()}>
				<span className='icon icon-chevron_down' />
			</button>
		</VendorFilterContainer>
	)
}

export default VendorFilter
