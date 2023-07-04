import React, { useRef } from 'react'
import Image from 'next/future/image'
import process from 'process'
import { useHover } from 'usehooks-ts'
import classNames from 'classnames'

interface IVendorItemProps {
	isActive: boolean
	displayText: string
	imgName: string
}

const VendorItem = ({
	isActive,
	displayText,
	imgName: originImgName,
}: IVendorItemProps) => {
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)
	const imgName = isHover ? `${originImgName}a` : originImgName

	return (
		<div className='swiper-slide'>
			<button ref={hoverRef} className={classNames({ active: isActive })}>
				<div>
					<Image
						width={100}
						height={55}
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/venderlogo/${imgName}.png`}
						alt={displayText}
					/>
					<div>{displayText}</div>
				</div>
			</button>
		</div>
	)
}

export default VendorItem
