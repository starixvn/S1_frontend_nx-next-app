/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'
import { useMenu } from '@nx-next-app/hooks'
import classNames from 'classnames'
import { useDebounce } from 'usehooks-ts'
import { useTranslation } from 'next-i18next'
import { uniqueId, upperCase } from 'lodash-es'
import { MenuKeyEnum } from '@nx-next-app/types'

const Menu = () => {
	const { t } = useTranslation()

	const menu = useMenu()

	const [menuKey, setMenuKey] = useState<string>()
	const debouncedMenuKey = useDebounce(menuKey, 350)

	const { subMenu, subMenuClassName } = menu[debouncedMenuKey || ''] ?? {}

	return (
		<div className='menu'>
			<div>
				{Object.keys(menu).map(key => {
					const { className, path = '/', displayKey, displayText } = menu[key]

					return (
						<Link href={path} key={uniqueId()}>
							<a
								className={classNames(className)}
								onMouseEnter={() => setMenuKey(key)}
								onMouseLeave={() => setMenuKey(undefined)}
							>
								<div />

								{displayKey ? t(displayKey) : displayText}
							</a>
						</Link>
					)
				})}

				<div className='subMenu-Wrapper-new'>
					{Object.keys(menu).map(key => {
						const { subMenu, subMenuClassName, path } = menu[key]

						if (key === MenuKeyEnum.AppDownload) {
							return (
								<a
									className={classNames(subMenuClassName, {
										active: key === debouncedMenuKey,
									})}
								>
									<div>
										<div className='txt-orange'>
											{upperCase(process.env['NEXT_PUBLIC_SITE_NAME'])}
										</div>
										<div>The Most User Friendly APP</div>
									</div>
								</a>
							)
						}

						return (
							subMenu && (
								<div
									key={key}
									className={classNames(subMenuClassName, {
										active: key === debouncedMenuKey,
									})}
									onMouseEnter={() => setMenuKey(key)}
									onMouseLeave={() => setMenuKey(undefined)}
								>
									{subMenu?.map(item => (
										<Link key={uniqueId()} href={item.path || '/'}>
											<a className={classNames(item.className)}>
												<img
													className='ListBG-left'
													alt='ListBG-left'
													src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/subMenu-Wrapper-ListBG-left.png`}
												/>
												<img
													className='ListBG-right'
													alt='ListBG-right'
													src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/subMenu-Wrapper-ListBG-right.png`}
												/>
												<img
													className='ListBG-center'
													alt='ListBG-center'
													src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/subMenu-Wrapper-ListBG-center.png`}
												/>

												{item.headerMenuImgList?.map(img => (
													<img
														key={img.imgUrl}
														className={classNames(img.className)}
														alt={img.imgUrl}
														src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${img.imgUrl}`}
													/>
												))}
												<span>
													{item.displayKey
														? t(item.displayKey)
														: item.displayText}
												</span>

												<div className='under'>Under Maintenance</div>
											</a>
										</Link>
									))}
								</div>
							)
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Menu
