import { isUrl } from '@nx-next-app/utils'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

export interface IImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	onClick?: () => void
	hoverImg?: string
}

/**
 * 擴充 hover、onClick 功能的原生 img 元件
 * @description 存渲染需優化的圖片使用 next/feature/image，其他圖片渲染可以盡量使用此元件實作
 * @example
 * ```tsx
					<Img
						key={item.img}
						onClick={() => null}
						src={item.img}
						hoverImg={item.hoverImg}
						alt='img'
					/>
 * ```
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
