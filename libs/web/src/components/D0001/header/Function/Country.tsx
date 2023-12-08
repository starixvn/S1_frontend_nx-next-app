import classNames from 'classnames'
import { LANG_GROUP_COUNTRY } from '@nx-next-app/constants'
import { Fragment } from 'react'

interface ICountryProps {
	icon: string | null
	isActive: boolean
	selectedText?: string
	toggle: () => void
	onSetLanguage: ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => void
	langGroup: {
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
		}>
	}
}

const Country = ({
	icon,
	isActive,
	langGroup,
	selectedText,
	toggle,
	onSetLanguage,
}: ICountryProps) => {
	return (
		<>
			<button
				type='button'
				aria-label='country-flag'
				className={classNames('flag arrow', icon)}
				onClick={toggle}
				style={{ whiteSpace: 'nowrap' }}
			>
				{selectedText && selectedText}
			</button>

			<div className={classNames('countryList', { active: isActive })}>
				{Object.entries(langGroup).map(([lang, item]) => (
					<Fragment key={lang}>
						<div className='countryName' key={lang}>
							{LANG_GROUP_COUNTRY[lang]}
						</div>
						<div className={classNames('flag', lang)} key={`flag_${lang}`}>
							{item?.map(({ value, currencyId, displayText }) => {
								return (
									<button
										key={`${lang}_${value}`}
										type='button'
										onClick={() => {
											onSetLanguage({
												langCode: value,
												currencyId,
											})
											toggle()
										}}
									>
										{displayText}
									</button>
								)
							})}
						</div>
					</Fragment>
				))}
			</div>
		</>
	)
}

export default Country
