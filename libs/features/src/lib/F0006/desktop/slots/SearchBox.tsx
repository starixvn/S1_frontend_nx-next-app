import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const SearchBox = () => {
	const { t } = useTranslation()
	const { searchCategoryText, onSearchCategoryTextChange } = useSlots()
	return (
		<div className='inputBox-white'>
			<i className='txt-blue12 icon icon-search' />
			<input
				type='text'
				onChange={e => onSearchCategoryTextChange(e.target.value)}
				placeholder={t('Label_SearchGames') as string}
				value={searchCategoryText}
			/>
		</div>
	)
}

export default SearchBox
