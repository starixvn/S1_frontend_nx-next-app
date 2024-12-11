import { VendorFilterContainer } from '@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter/styles'
import VendorItem from '@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter/VendorItem'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'

const VendorFilter = () => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
		providerSize,
	} = useSlots()

	return (
		<VendorFilterContainer
			className={`${classNames({
				active: isActiveDropdown,
			})}`}
		>
			<div className='provider-list'>
				{vendorList.map(({ tpId, openPath, tpName, imgName, displayText }) => (
					<VendorItem
						key={`slot-swiper-${tpId}`}
						onClick={() =>
							onVendorChange({
								tpId,
								openPath,
								isLobby: false,
							})
						}
						isActive={activeVendorTpId === tpId}
						displayText={displayText}
						imgName={imgName}
					/>
				))}
			</div>
			{vendorList.length > providerSize && (
				<button className='btn-toggle' onClick={() => onToggleDropdown()}>
					<span className='icon icon-chevron_down' />
				</button>
			)}
		</VendorFilterContainer>
	)
}

export default VendorFilter
