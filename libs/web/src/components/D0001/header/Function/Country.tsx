import classNames from 'classnames'
import { LANG_GROUP_COUNTRY } from '@nx-next-app/constants'
import { useRef, Fragment } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

interface ICountryProps {
	icon: string | null
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

const Country = ({ icon, onSetLanguage, langGroup }: ICountryProps) => {
	const ref = useRef(null)

	const { value: isOpen, toggle, setFalse } = useBoolean(false)
	useBoolean()

	useOnClickOutside(ref, setFalse)

	return (
		<div ref={ref} className={classNames('country', { active: isOpen })}>
			<button
				type='button'
				aria-label='country-flag'
				className={classNames('flag', icon)}
				onClick={toggle}
			>
				{' '}
			</button>

			<div className='countryList'>
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
		</div>
	)
}

export default Country
