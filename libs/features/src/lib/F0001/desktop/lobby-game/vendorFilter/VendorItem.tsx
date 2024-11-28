import classNames from "classnames";
import process from "process";
import { useRef } from "react";
import { useHover } from "usehooks-ts";

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
			<div className='img-container'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/filter-form-provider-logo/${imgName}.webp`}
					alt={displayText}
				/>
			</div>
			<div className='name'>{displayText}</div>
		</a>
	)
}

export default VendorItem
