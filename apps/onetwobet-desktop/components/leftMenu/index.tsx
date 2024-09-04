import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useWalletAllowed } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import classNames from 'classnames'
import { includes, isArray, uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface ILeftMenuProps {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const LeftMenu = ({ withdrawalBlockSetting }: ILeftMenuProps) => {
	const { t } = useTranslation()
	const { pathname: routerPath, push } = useRouter()

	const { LEFT_MENU_DATA } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const {
		cardAllowed: { bankCardAllowed, cryptoCardAllowed },
	} = useWalletAllowed({ withdrawalBlockSetting })

	const menuList = Object.values(LEFT_MENU_DATA).map(
		({ displayKey, subMenu }) => {
			const submenuList = Object.values(subMenu)
				.filter(({ pathname, allowCurrencies }) => {
					let isShow = true
					if (isArray(allowCurrencies))
						isShow = includes(allowCurrencies, currencyId)

					//* 與 api 的 withdrawal payment 同步
					if (pathname === paths.bankInfo.root) isShow = bankCardAllowed
					if (pathname === paths.cryptoWallet.root) isShow = cryptoCardAllowed

					return isShow
				})
				.map(({ displayKey, pathname, allowCurrencies }) => {
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
				})

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
