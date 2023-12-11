import React, { useRef } from 'react'
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
	const imgName = isHover && !isActive ? `${originImgName}a` : originImgName

	return (
		<div className='swiper-slide'>
			<button ref={hoverRef} className={classNames({ active: isActive })}>
				<div>
					<img
						src={`${
							process.env['NEXT_PUBLIC_BANNER_HOST']
						}/desktop/img/venderlogo/${imgName}${isActive ? 'a' : ''}.png`}
						alt={displayText}
					/>
					<div>{displayText}</div>
				</div>
			</button>
		</div>
	)
}

export default VendorItem
