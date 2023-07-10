import Link from 'next/link'
import classNames from 'classnames'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { IMenuData, MenuKeyEnum } from '@nx-next-app/features/F0001/types'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import SubMenu from './SubMenu'

const Menu = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { menuData } = useMenu<IMenuData>({ langId })
	const [menuKey, setMenuKey] = useState<string>()
	const debouncedMenuKey = useDebounce(menuKey, 350)

	return (
		<div className='menu'>
			<div>
				{Object.keys(menuData).map(key => {
					const {
						className,
						pathname = '/',
						displayKey,
						displayText,
					} = menuData[key as MenuKeyEnum]

					return (
						<Link href={pathname} key={uniqueId()}>
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

				<SubMenu debouncedMenuKey={debouncedMenuKey} setMenuKey={setMenuKey} />
			</div>
		</div>
	)
}

export default Menu
