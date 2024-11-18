import classNames from 'classnames'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import VendorItem from './VendorItem'

const VendorFilter = () => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
	} = useSlots()
	return (
		<div
			className={`provider ${classNames({
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
                isLobby: false
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
		</div>
	)
}

export default VendorFilter
