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
			<button onClick={() => onToggleDropdown()}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/down.png`}
					alt=''
				/>
			</button>
		</VendorFilterContainer>
	)
}

export default VendorFilter
