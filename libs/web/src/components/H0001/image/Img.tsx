import { isUrl } from '@nx-next-app/utils'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

export interface IImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	onClick?: () => void
	hoverImg?: string
}

/**
 * @description 擴充 hover、onClick 功能的原生 img 元件
 */
const Img = ({ onClick, src = '', alt, hoverImg, ...props }: IImgProps) => {
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)

	if (!isUrl(src)) return null

	if (onClick) {
		return (
			<div onClick={onClick}>
				<img
					ref={hoverRef}
					src={isHover && Boolean(hoverImg) ? hoverImg : src}
					alt={alt}
					{...props}
				/>
			</div>
		)
	}

	return (
		<img
			ref={hoverRef}
			src={isHover && Boolean(hoverImg) ? hoverImg : src}
			alt={alt}
			{...props}
		/>
	)
}

export { Img }
