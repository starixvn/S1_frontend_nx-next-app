import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FieldErrors } from 'react-hook-form'
import { useAuth } from '@nx-next-app/data-access'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { renderFieldError } from '@nx-next-app/utils'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { CurrenciesEnum } from '@nx-next-app/types'
import { Header, LoginFormType } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import Menu from './Menu'
import Wallet from './Wallet'
import Country from './Country'
import MsgPopUp from './MsgPopUp'

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
			modal.info(t('Label_General_LoggedOut'), {
				icon: 'icon icon-exit',
				title: t('Label_General_LogOut'),
			})
		} catch (error) {
			modal.info((error as Error).message)
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

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo_w.png`

	// * line 登入按鈕的顯示邏輯
	const showLineLogin = currencyId === CurrenciesEnum.THB

	return (
		<Header>
			<Header.Logo
				logoUrl={logoUrl}
				rewardsUrl={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/88rewards.png`}
				showSpLogo
			/>
			<Header.Function>
				{auth.isLogin ? (
					<>
						<Header.Function.MemberFile onSignOut={handleSignOut} />
						<MsgPopUp />
						<div className='line' />
						<Wallet />
						<Link href={paths.deposit.root}>
							<a className='deposit-btn'>
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
