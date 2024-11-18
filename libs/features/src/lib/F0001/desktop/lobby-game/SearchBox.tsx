import React from 'react'
import { useTranslation } from 'next-i18next'
import { useLobby } from '@nx-next-app/features/F0001/providers'

const SearchBox = () => {
	const { t } = useTranslation()
	const { searchCategoryText, onSearchCategoryTextChange } = useLobby()
	return (
		<div className='search-bar'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/search-icon.png`}
				alt=''
			/>
			<input
				className='search-input'
				type='text'
				onChange={e => onSearchCategoryTextChange(e.target.value)}
				placeholder={t('Label_SearchGames') as string}
				value={searchCategoryText}
			/>
		</div>
	)
}

export default SearchBox
