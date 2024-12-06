import { CategoryFilterTabs } from '@nx-next-app/features/F0001/h5/lobby-game/styles'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslation } from 'next-i18next'

const CategoryFilter = () => {
	const { categoryKeys, activeCategoryKey, onCategoryChange } = useSlots()
	const { t } = useTranslation()
	const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 'auto' })

	return (
		<CategoryFilterTabs>
			<div className='embla'>
				<div className='embla__viewport' ref={emblaRef}>
					<div className='embla__container'>
						{categoryKeys.map(value => {
							return (
								<button
									key={`slot-nav-${value}`}
									className={`embla__slide tab-item ${
										activeCategoryKey === value ? 'active' : ''
									}`}
									onClick={() => onCategoryChange(value)}
								>
									{t(
										`Label_General_${
											value.charAt(0).toUpperCase() + value.slice(1)
										}`
									)}
								</button>
							)
						})}
					</div>
				</div>
			</div>
		</CategoryFilterTabs>
	)
}

export default CategoryFilter
