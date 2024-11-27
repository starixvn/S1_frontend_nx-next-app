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
				{vendorList.map(({ tpId, openPath, tpName, imgName, displayText }) => (
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
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/down.png`}
					alt=''
				/>
			</button>
		</VendorFilterContainer>
	)
}

export default VendorFilter
