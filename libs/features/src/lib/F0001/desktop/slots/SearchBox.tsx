import React from 'react'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const SearchBox = () => {
	const { t } = useTranslation()
	const { searchCategoryText, onSearchCategoryTextChange } = useSlots()
	return (
		<div className='search-bar'>
			<Image
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-slots/search-icon.png`}
				alt=''
				width={20}
				height={20}
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
