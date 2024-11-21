import React from 'react'
import process from 'process'
import { IVendorData } from '@nx-next-app/service'
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
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/venderlogo/${
					item.imgName
				}${tpId === activeVendorTpId ? 'a' : ''}.png`}
				alt={displayText}
			/>
		</a>
	)
}

export default VendorItem
