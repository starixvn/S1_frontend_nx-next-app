import classNames from 'classnames'
import Image from 'next/future/image'
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
							})
						}
						isActive={activeVendorTpId === tpId}
						displayText={displayText}
						imgName={imgName}
					/>
				))}
			</div>
			<button onClick={() => onToggleDropdown()}>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/down.png`}
					alt=''
					width={18}
					height={18}
				/>
			</button>
		</div>
	)
}

export default VendorFilter
