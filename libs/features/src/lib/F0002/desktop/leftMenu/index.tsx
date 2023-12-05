import classNames from 'classnames'
import { isArray, includes, uniqueId } from 'lodash-es'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'

const LeftMenu = () => {
	const { t } = useTranslation()
	const { pathname: routerPath, push } = useRouter()

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
							<a
								key={displayKey}
								className={classNames('menuSelect', { active: matchPath })}
								onClick={() => {
									// * 目標路徑不同才進行導轉
									!matchPath && push(pathname)
								}}
							>
								<span className=''>{t(displayKey)}</span>
							</a>
						)
					)
				}
			)

			return (
				<div className='menuModule' key={uniqueId()}>
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

export default LeftMenu
