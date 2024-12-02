interface IBreadcrumbProps {
	items: { displayKey: string; value: string | number | null }[]
	activeItem?: string | number | null
	onClick: (value: string | number | null) => void
}

const Breadcrumb = ({ items, activeItem, onClick }: IBreadcrumbProps) => {
	const index = items.findIndex(item => item.value === activeItem) + 1
	return (
		<nav className='breadcrumb'>
			<ul>
				{items.slice(0, index).map(({ displayKey, value }) => (
					<li key={displayKey} className='icon breadcrumb-item'>
						<a onClick={() => onClick(value)}>{displayKey}</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Breadcrumb
