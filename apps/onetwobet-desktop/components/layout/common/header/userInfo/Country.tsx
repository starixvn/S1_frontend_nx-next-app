import { LANG_GROUP_COUNTRY } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { Fragment, useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const Country = () => {
	const { getBannerUrl } = useGlobalData()
	const {
		auth: { isLogin },
	} = useAuth()
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
					alt=''
				/>{' '}
				{LANG_GROUP_COUNTRY[icon || 'ch']}
			</button>
			<div className='language-list'>
				<div className='country-current'>
					<div className='icon'>
						<img src={getBannerUrl(`/desktop/img/flag/${icon}.jpg`)} alt='' />
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
				{!isLogin && (
					<div className='country-options'>
						{Object.entries(languageGroup).map(([lang, item]) => (
							<Fragment key={lang}>
								{item?.map(
									({ value, currencyId, displayText, mainLanguage }) => {
										if (!mainLanguage) return
										return (
											<button
												className='icon'
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
												<img
													src={getBannerUrl(`/desktop/img/flag/${lang}.jpg`)}
													alt={`flag ${lang}`}
												/>
												{displayText}
											</button>
										)
									}
								)}
							</Fragment>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Country
