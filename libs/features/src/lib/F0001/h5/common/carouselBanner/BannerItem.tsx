import React, { ReactElement } from 'react'

interface IBannerItemProps {
	src: string
	alt: string
	className?: string
	isRedirect: boolean
	onClick: () => void
}

const BannerItem = ({
	src,
	alt,
	className,
	onClick,
	isRedirect,
}: IBannerItemProps): ReactElement => {
	if (isRedirect) {
		return (
			<div onClick={onClick} className={className}>
				{src && <img className='banner' src={src} alt={alt} />}
			</div>
		)
	}

	return (
		<button onClick={onClick} className={className}>
			{src && <img className='banner' src={src} alt={alt} />}
		</button>
	)
}

export default BannerItem
