import React from 'react'
import Image from 'next/future/image'
import process from 'process'
import { IVendorData } from 'libs/web/src/service/gameApi/type'
import classNames from 'classnames'

interface IVendorItemProps {
	item: IVendorData
	tpId: number
	displayText: string
	activeVendorTpId?: string | number | null
	onClick: (provider: IVendorData) => void
}

const VendorItem = ({
	item,
	tpId,
	displayText,
	activeVendorTpId,
	onClick,
}: IVendorItemProps) => {
	return (
		<a
			onClick={() => onClick(item)}
			className={classNames({ active: tpId === activeVendorTpId })}
		>
			<Image
				width={60}
				height={40}
				src={`${
					process.env['NEXT_PUBLIC_BANNER_HOST']
				}/desktop/img/venderlogo/${item.imgName}${
					tpId === activeVendorTpId ? 'a' : ''
				}.png`}
				alt={displayText}
			/>
		</a>
	)
}

export default VendorItem
