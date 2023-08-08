import React from 'react'
import { useTranslation } from 'next-i18next'

interface ISearchBoxProps {
	searchText: string
	onChange: (value: string) => void
}

const SearchBox = ({ searchText, onChange }: ISearchBoxProps) => {
	const { t } = useTranslation()
	return (
		<div className='inputBox-white'>
			<i className='txt-blue12 icon icon-search' />
			<input
				type='text'
				onChange={e => onChange(e.target.value)}
				placeholder={t('Label_SearchGames') as string}
				value={searchText}
			/>
		</div>
	)
}

export default SearchBox
