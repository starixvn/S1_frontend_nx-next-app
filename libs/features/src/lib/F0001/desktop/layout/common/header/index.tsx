import { Header, LoginFormType } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { renderFieldError } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FieldErrors } from 'react-hook-form'
import Country from './Country'
import MsgPopUp from './MsgPopUp'
import Wallet from './Wallet'
import Menu from './menu'

const LayoutHeader = () => {
	const { t } = useTranslation()
	const router = useRouter()

	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen, isLobbyHeaderError } = useMenu()
	const {
		auth,
		onSignIn,
		onSignOut,
		userInfo: { currencyId },
	} = useAuth()

	const [getLineLoginDirectUrl] = useLazyGetLineLoginDirectUrlQuery()

	const handleSignIn = async (payload: {
		userName: string
		password: string
	}) => {
		try {
			await onSignIn(payload)
			router.push(paths.home.root)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleSignOut = async () => {
		try {
			await onSignOut()
			await router.push(paths.home.root)
			router.reload()
		} catch (error) {
			// 因為會有已登出但畫面還未登出的情況，所以這裡不開彈窗接出錯誤訊息
			router.reload()
			// modal.error((error as Error).message)
		}
	}

	const handleLoginInvalid = (errors: FieldErrors<LoginFormType>) => {
		modal.error(renderFieldError(errors))
	}

	const handleLineLogin = async () => {
		try {
			const { data: lineLoginDirectUrl } = await getLineLoginDirectUrl({
				type: LineLoginDirectTypeEnum.Login,
			}).unwrap()

			if (lineLoginDirectUrl) {
				window.location.href = lineLoginDirectUrl
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	// * line 登入按鈕的顯示邏輯
	const showLineLogin = currencyId === CurrenciesEnum.THB

	// 廣告商用的事件記錄器，綁在 DepositButton 底下
	const handleYuriAddToCartClick = () => {
		/* eslint no-underscore-dangle: 0 */
		if ((window as any)._yuri_track) {
			;(window as any)._yuri_track('AddToCart')
		}
	}

	return (
		<Header>
			<Header.Logo
				rewardsUrl={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/88rewards.png`}
			/>
			<Header.Function>
				{auth.isLogin ? (
					<>
						<Header.Function.MemberFile onSignOut={handleSignOut} />
						<MsgPopUp />
						<div className='line' />
						<Wallet />
						<Link href={paths.deposit.root}>
							<a className='deposit-btn' onClick={handleYuriAddToCartClick}>
								<span>{t('Label_Deposit')}</span>
							</a>
						</Link>
					</>
				) : (
					<>
						<Header.Function.Login
							onLogin={handleSignIn}
							onLoginInvalid={handleLoginInvalid}
							onLineLogin={showLineLogin && handleLineLogin}
						/>
						<Country />
					</>
				)}
			</Header.Function>

			<Menu
				menuList={menuList}
				onMenuOpen={onMenuOpen}
				isLobbyHeaderError={isLobbyHeaderError}
			/>
		</Header>
	)
}

export default LayoutHeader
