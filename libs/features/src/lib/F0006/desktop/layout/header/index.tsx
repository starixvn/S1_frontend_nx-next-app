import { Header, LoginFormType } from '@nx-next-app/components/D0006'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/yashbet'
import { renderFieldError } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FieldErrors } from 'react-hook-form'
import Country from './Country'
import MemberFile from './MemberFile'
import Menu from './Menu'
import MsgPopUp from './MsgPopUp'
import Wallet from './Wallet'

const LayoutHeader = () => {
	const { t } = useTranslation()
	const router = useRouter()

	const { modal } = useGlobalModal()

	const { auth, onSignIn, onSignOut } = useAuth()
	const {
		userInfo: { currencyId },
	} = useAuth()

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
			await router.push(paths.home.root).then(() => router.reload())
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleLoginInvalid = (errors: FieldErrors<LoginFormType>) => {
		modal.error(renderFieldError(errors))
	}

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/logo.png`

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
				logoUrl={logoUrl}
				rewardsUrl={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/88rewards.png`}
			/>
			<Header.Function>
				{auth.isLogin ? (
					<>
						{includes(ALLOWED_CURRENCIES.TRANSFER, currencyId) && (
							<Link href={paths.transferFunds.root}>
								<a>
									<span>{t('Label_General_TransferFunds')}</span>
								</a>
							</Link>
						)}

						<Link href={paths.withdrawal.root}>
							<a>
								<span>{t('Label_General_Withdrawal')}</span>
							</a>
						</Link>

						<Link href={paths.history.root}>
							<a>
								<span>{t('Label_General_History')}</span>
							</a>
						</Link>

						<Link href={paths.deposit.root}>
							<a className='deposit-btn' onClick={handleYuriAddToCartClick}>
								<span>{t('Label_General_Deposit')}</span>
							</a>
						</Link>

						<Wallet />

						<MemberFile />

						<MsgPopUp />

						<Country />

						<button
							onClick={handleSignOut}
							type='button'
							className='icon icon-exit'
						/>
					</>
				) : (
					<>
						<Header.Function.Login
							onLogin={handleSignIn}
							onLoginInvalid={handleLoginInvalid}
						/>
						<Country />
						<Link href={paths.forgetPassword.root}>
							<a className='forgot'>{t('Label_Header_ForgetPassword')}</a>
						</Link>
					</>
				)}
			</Header.Function>

			<Menu />
		</Header>
	)
}

export default LayoutHeader
