import { SearchForm } from '@nx-next-app/features/F0001/desktop/lobby-game/styles'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const SearchBox = () => {
	const { t } = useTranslation()
	const { searchCategoryText, onSearchCategoryTextChange } = useSlots()

	return (
		<SearchForm>
			<span className='icon icon-search' />
			<input
				className='search-input'
				type='text'
				onChange={e => onSearchCategoryTextChange(e.target.value)}
				placeholder={t('Label_SearchGames') as string}
				value={searchCategoryText}
			/>
		</SearchForm>
	)
}

export default SearchBox
