import React from 'react'
import classNames from 'classnames'

interface IBreadcrumbProps {
	items: { displayKey: string; value: string | number | null }[]
	activeItem?: string | number | null
	onClick: (value: string | number | null) => void
}

const Breadcrumb = ({ items, activeItem, onClick }: IBreadcrumbProps) => {
	const index = items.findIndex(item => item.value === activeItem) + 1
	return (
		<nav className='breadcrumb'>
			{items.slice(0, index).map(({ displayKey, value }) => (
				<a
					role='link'
					aria-hidden
					onClick={() => onClick(value)}
					key={displayKey}
					className={classNames({ active: activeItem === value })}
				>
					{displayKey}
				</a>
			))}
		</nav>
	)
}

export default Breadcrumb
