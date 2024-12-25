import { LANG_GROUP_COUNTRY } from '@nx-next-app/constants'
import classNames from 'classnames'
import { Fragment } from 'react'

interface ICountryProps {
	icon: string | null
	isActive: boolean
	isLogin?: boolean
	toggle: () => void
	onSetLanguage: ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => void
	selectedText?: string
	langGroup: {
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
			mainLanguage?: boolean
		}>
	}
}

const Country = ({
	icon,
	isActive,
	isLogin = false,
	langGroup,
	toggle,
	onSetLanguage,
	selectedText,
}: ICountryProps) => {
	const langGroups = Object.entries(langGroup)
	return (
		<>
			<button
				type='button'
				aria-label='country-flag'
				className={classNames('flag arrow', icon)}
				onClick={toggle}
				style={{ whiteSpace: 'nowrap' }}
			>
				<span>{selectedText && selectedText}</span>
			</button>
			<div className={classNames('country-list', { active: isActive })}>
				<div className='country-current'>
					<div className={classNames('flag', icon)} />
					<div className='country-info'>
						<div className='country-name'>
							{LANG_GROUP_COUNTRY[icon || 'ch']}
						</div>
						<div>
							{langGroup[icon || 'ch']?.map(
								({ displayText, currencyId, value }) => {
									return (
										<button
											key={displayText}
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
								}
							)}
						</div>
					</div>
				</div>
				{!isLogin && langGroups.length > 1 && (
					<div className='country-option'>
						{langGroups.map(([lang, item]) => (
							<Fragment key={lang}>
								<div className={classNames('flag', lang)} key={`flag_${lang}`}>
									{item?.map(
										({ value, currencyId, displayText, mainLanguage }) => {
											if (!mainLanguage) return
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
										}
									)}
								</div>
							</Fragment>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default Country
