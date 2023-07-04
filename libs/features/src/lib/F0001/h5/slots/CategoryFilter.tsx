import React from 'react'
import { useTranslation } from 'next-i18next'

interface ICategoryFilterProps {
	categoryList: string[]
	activeCategory: string | null
	onChange: (value: string) => void
}

const CategoryFilter = ({
	categoryList,
	activeCategory,
	onChange,
}: ICategoryFilterProps) => {
	const { t } = useTranslation()
	return (
		<div className='filterSelect'>
			{categoryList.map(value => {
				return (
					<button
						key={`slot-nav-${value}`}
						className={activeCategory === value ? 'active' : ''}
						onClick={() => onChange(value)}
					>
						{t(`Label_${value.charAt(0).toUpperCase() + value.slice(1)}`)}
					</button>
				)
			})}
		</div>
	)
}

export default CategoryFilter
