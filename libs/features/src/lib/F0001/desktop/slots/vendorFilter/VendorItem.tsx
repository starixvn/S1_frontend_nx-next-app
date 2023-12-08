import React, { useRef } from 'react'
import process from 'process'
import { useHover } from 'usehooks-ts'
import classNames from 'classnames'
import Image from 'next/future/image'

interface IVendorItemProps {
	isActive: boolean
	displayText: string
	imgName: string
	onClick: () => void
}

const VendorItem = ({
	isActive,
	displayText,
	imgName: originImgName,
	onClick,
}: IVendorItemProps) => {
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)
	const imgName = isHover && !isActive ? `${originImgName}a` : originImgName

	return (
		<a
			onClick={onClick}
			className={classNames('provider-list-item', { active: isActive })}
		>
			<div>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/provider-logo/${imgName}.png`}
					alt={displayText}
					width={29}
					height={29}
				/>
			</div>
			<div>{displayText}</div>
		</a>
	)
}

export default VendorItem
