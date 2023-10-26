import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const CategoryFilter = () => {
	const { categoryKeys, activeCategoryKey, onCategoryChange } = useSlots()
	const { t } = useTranslation()
	return (
		<div className='filterSelect'>
			{categoryKeys.map(value => {
				return (
					<button
						key={`slot-nav-${value}`}
						className={activeCategoryKey === value ? 'active' : ''}
						onClick={() => onCategoryChange(value)}
					>
						{t(
							`Label_General_${value.charAt(0).toUpperCase() + value.slice(1)}`
						)}
					</button>
				)
			})}
		</div>
	)
}

export default CategoryFilter
