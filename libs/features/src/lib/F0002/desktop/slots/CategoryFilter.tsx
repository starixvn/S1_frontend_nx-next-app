import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSlots } from '@nx-next-app/features/F0002/providers'

const CategoryFilter = () => {
	const { categoryKeys, activeCategoryKey, onCategoryChange } = useSlots()
	const { t } = useTranslation()
	return (
		<div className='btnGroup promoType'>
			{categoryKeys.map(value => {
				return (
					<button
						key={`casino-nav-${value}`}
						className={activeCategoryKey === value ? 'btn-check' : 'blueBorder'}
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
