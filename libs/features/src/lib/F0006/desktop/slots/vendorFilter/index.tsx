import { Swiper, SwiperSlide } from 'swiper/react'
import { useSlots } from '@nx-next-app/features/F0006/providers'
import VendorItem from './VendorItem'

const VendorFilter = () => {
	const { vendorList, activeVendorTpId, onVendorChange } = useSlots()
	return (
		<div className='partnerSelect'>
			<Swiper spaceBetween={0} slidesPerView={9} navigation>
				{vendorList.map(({ tpId, openPath, tpName, imgName, displayText }) => (
					<SwiperSlide
						key={`slot-swiper-${tpId}`}
						onClick={() =>
							onVendorChange({
								tpId,
								openPath,
							})
						}
					>
						<VendorItem
							isActive={activeVendorTpId === tpId}
							displayText={displayText}
							imgName={imgName}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default VendorFilter
