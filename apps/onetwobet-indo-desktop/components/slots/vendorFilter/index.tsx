import { useGlobalData } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/operations'
import classNames from 'classnames'
import VendorItem from './VendorItem'

const VendorFilter = () => {
	const {
		vendorList,
		activeVendorTpId,
		isActiveDropdown,
		onVendorChange,
		onToggleDropdown,
	} = useSlots()
	const { getBannerUrl } = useGlobalData()

	return (
		<div className={classNames('provider', { active: isActiveDropdown })}>
			<div className='provider-list'>
				{vendorList.map(({ tpId, openPath, imgName, displayText }) => (
					<VendorItem
						key={`slot-swiper-${tpId}`}
						onClick={() => onVendorChange({ tpId, openPath })}
						isActive={activeVendorTpId === tpId}
						displayText={displayText}
						imgName={imgName}
					/>
				))}
			</div>
			<button onClick={onToggleDropdown}>
				<img
					src={getBannerUrl('/desktop/img/4.0/lobby-slots/down.png')}
					alt=''
				/>
			</button>
		</div>
	)
}

export default VendorFilter
