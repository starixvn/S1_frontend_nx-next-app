import { LANG_GROUP_COUNTRY } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const Country = () => {
	const { getBannerUrl } = useGlobalData()
	const ref = useRef(null)
	const { value: isActive, toggle, setFalse } = useBoolean(false)
	const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
	useOnClickOutside(ref, setFalse)
	return (
		// <!--新增 .active language-list會出現-->
		<div
			ref={ref}
			className={classNames('language-selector', {
				'active language-list': isActive,
			})}
		>
			<button className='thrid' onClick={toggle}>
				<img
					className='icon'
					src={getBannerUrl(`/desktop/img/flag/${icon}.jpg`)}
					alt='flag icon'
				/>{' '}
				{LANG_GROUP_COUNTRY[icon || 'ch']}
			</button>
			<div className='language-list'>
				<div className='country-current'>
					<div className='icon'>
						<img
							src={getBannerUrl(`/desktop/img/flag/${icon}.jpg`)}
							alt='flag icon'
						/>
					</div>
					<div className='country-info'>
						<div>{LANG_GROUP_COUNTRY[icon || 'ch']}</div>
						<div className='language-options'>
							{languageGroup[icon || 'ch']?.map(
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
			</div>
		</div>
	)
}

export default Country
