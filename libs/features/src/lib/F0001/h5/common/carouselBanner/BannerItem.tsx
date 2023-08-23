import React, { ReactElement } from 'react'
import Image from 'next/future/image'
import { isUrl } from '@nx-next-app/utils'

interface IBannerItemProps {
	itemKey: string
	src: string
	alt: string
	className?: string
	isRedirect: boolean
	onClick: () => void
}

const BannerItem = ({
	itemKey,
	src,
	alt,
	className,
	onClick,
	isRedirect,
}: IBannerItemProps): ReactElement => {
	if (isRedirect) {
		return (
			<div key={itemKey} onClick={onClick} className={className}>
				{isUrl(src) ? (
					<Image
						className='banner'
						width={1920}
						height={500}
						src={src}
						alt={alt}
					/>
				) : (
					<img className='banner' src={src} alt={alt} />
				)}
			</div>
		)
	}
	return (
		<button key={itemKey} onClick={onClick} className={className}>
			{isUrl(src) ? (
				<Image
					className='banner'
					width={1920}
					height={500}
					src={src}
					alt={alt}
				/>
			) : (
				<img className='banner' src={src} alt={alt} />
			)}
		</button>
	)
}

export default BannerItem
