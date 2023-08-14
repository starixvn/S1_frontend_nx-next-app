import Link from 'next/link'
import classNames from 'classnames'
import { isArray, includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

const LeftMenu = () => {
	const { t } = useTranslation()
	const { pathname: routerPath } = useRouter()

	const { LEFT_MENU_DATA } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const menuList = Object.values(LEFT_MENU_DATA).map(
		({ displayKey, subMenu }) => {
			const submenuList = Object.values(subMenu).map(
				({ displayKey, pathname, allowCurrencies }) => {
					const matchPath = routerPath.match(pathname)
					const isMatchCurrency = isArray(allowCurrencies)
						? includes(allowCurrencies, currencyId)
						: !allowCurrencies

					return (
						isMatchCurrency && (
							<Link href={pathname}>
								<a className={classNames('menuSelect', { active: matchPath })}>
									<span className=''>{t(displayKey)}</span>
								</a>
							</Link>
						)
					)
				}
			)

			return (
				<div className='menuModule'>
					<button className='menuHeader' style={{ cursor: 'auto' }}>
						{t(displayKey)}
					</button>
					{submenuList}
				</div>
			)
		}
	)

	return <div id='leftMenu'>{menuList}</div>
}

export { LeftMenu }
