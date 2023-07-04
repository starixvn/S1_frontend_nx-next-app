import React from 'react'
import Image from 'next/future/image'
import process from 'process'
import { IVendorData } from 'libs/web/src/service/gameApi/type'

interface IVendorItemProps {
	item: IVendorData
	tpId: number
	tpName: string
	displayText: string
	activeVendorTpId?: string | number | null
	onClick: (provider: IVendorData) => void
}

const VendorItem = ({
	item,
	tpId,
	tpName,
	displayText,
	activeVendorTpId,
	onClick,
}: IVendorItemProps) => {
	return (
		<a
			onClick={() => onClick(item)}
			className={tpId === activeVendorTpId ? 'active' : ''}
		>
			<Image
				width={100}
				height={55}
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/venderlogo/${item.imgName}.png`}
				alt={displayText}
			/>
		</a>
	)
}

export default VendorItem
