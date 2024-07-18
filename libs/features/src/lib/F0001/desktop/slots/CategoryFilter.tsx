import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const CategoryFilter = () => {
	const { categoryKeys, activeCategoryKey, onCategoryChange } = useSlots()
	const { t } = useTranslation()

	return (
		<div className='select-bar'>
			{categoryKeys.map(value => {
				return (
					<div
						key={`casino-nav-${value}`}
						className={classNames({ active: activeCategoryKey === value })}
						onClick={() => onCategoryChange(value)}
					>
						{t(
							`Label_General_${value.charAt(0).toUpperCase() + value.slice(1)}`
						)}
					</div>
				)
			})}
		</div>
	)
}

export default CategoryFilter
