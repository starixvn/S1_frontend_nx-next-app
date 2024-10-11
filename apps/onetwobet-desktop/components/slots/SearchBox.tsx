import { useGlobalData } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const SearchBox = () => {
	const { t } = useTranslation()
	const { searchCategoryText, onSearchCategoryTextChange } = useSlots()
	const { getBannerUrl } = useGlobalData()

	return (
		<div className='search-bar'>
			<img
				src={getBannerUrl('/desktop/img/4.0/lobby-slots/search-icon.png')}
				alt=''
			/>
			<input
				className='search-input'
				type='text'
				onChange={e => onSearchCategoryTextChange(e.target.value)}
				placeholder={t('Label_SearchGames')}
				value={searchCategoryText}
			/>
		</div>
	)
}

export default SearchBox
