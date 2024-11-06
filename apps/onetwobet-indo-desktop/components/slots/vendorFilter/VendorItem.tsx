import { useGlobalData } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

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
	const { getBannerUrl } = useGlobalData()
	const imgName = isHover && !isActive ? `${originImgName}a` : originImgName

	return (
		<a
			onClick={onClick}
			className={classNames('provider-list-item', { active: isActive })}
		>
			<div>
				<img
					src={getBannerUrl(
						`/desktop/img/4.0/lobby-slots/provider-logo/${imgName}.png`
					)}
					alt={displayText}
				/>
			</div>
			<div>{displayText}</div>
		</a>
	)
}

export default VendorItem
