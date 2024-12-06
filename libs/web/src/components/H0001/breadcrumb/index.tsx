import { BreadcrumbContainer } from '@nx-next-app/components/H0001/breadcrumb/styles'
import classNames from 'classnames'

interface IBreadcrumbProps {
	items: { displayKey: string; value: string | number | null }[]
	activeItem?: string | number | null
	onClick: (value: string | number | null) => void
}

const Breadcrumb = ({ items, activeItem, onClick }: IBreadcrumbProps) => {
	const index = items.findIndex(item => item.value === activeItem) + 1
	return (
		<BreadcrumbContainer>
			{items.slice(0, index).map(({ displayKey, value }) => (
				<a
					role='link'
					aria-hidden
					onClick={() => onClick(value)}
					key={displayKey}
					className={classNames('item', { active: activeItem === value })}
				>
					{displayKey}
				</a>
			))}
		</BreadcrumbContainer>
	)
}

export default Breadcrumb
