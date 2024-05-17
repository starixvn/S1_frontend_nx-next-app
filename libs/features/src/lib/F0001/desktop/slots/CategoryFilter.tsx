import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import { moveItem } from '@nx-next-app/utils'

const CategoryFilter = () => {
	const { categoryKeys, activeCategoryKey, onCategoryChange } = useSlots()
	const { t } = useTranslation()

	const newCategoryKeys = moveItem(categoryKeys, 5, 1)

	return (
		<div className='select-bar'>
			{newCategoryKeys.map(value => {
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
