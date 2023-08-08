import { Swiper, SwiperSlide } from 'swiper/react'
import { IVendorData } from 'libs/web/src/service/gameApi/type'
import VendorItem from './VendorItem'

interface IVendorFilterProps {
	vendorList: IVendorData[]
	activeVendorTpId?: string | number | null
	onVendorChange: (vendorData: { tpId: number; openPath: string }) => void
}

const VendorFilter = ({
	vendorList,
	activeVendorTpId,
	onVendorChange,
}: IVendorFilterProps) => {
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
