import Link from 'next/link'

import {
	Header,
	LoginFormType,
	useGlobalModal,
} from '@nx-next-app/components/D0001'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { FieldErrors } from 'react-hook-form'
import { renderFieldError } from '@nx-next-app/utils'
import MemberFile from './MemberFile'
import MsgPopUp from './MsgPopUp'
import Country from './Country'
import Wallet from './Wallet'

const LayoutHeader = () => {
	const {
		t,
		i18n: { language },
	} = useTranslation()
	const router = useRouter()

	const { modal } = useGlobalModal()

	const { auth, onSignIn, onSignOut } = useAuth()

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

			deleteCookie(`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`)
			deleteCookie(`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`)

			modal.open(t('Label_LoggedOut'), {
				icon: 'icon icon-exit',
				title: t('Label_LogOut'),
				onOK: () => router.push(paths.home.root),
			})
		} catch (error) {
			modal.info((error as Error).message)
		}
	}

	const handleLoginInvalid = (errors: FieldErrors<LoginFormType>) => {
		modal.error(renderFieldError(errors))
	}

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${
		language === 'cs' ? 'logo_cs' : 'logo_en'
	}.png`

	return (
		<Header>
			<Header.Logo
				logoUrl={logoUrl}
				rewardsUrl={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/88rewards.png`}
			/>
			<Header.Function>
				{auth.isLogin ? (
					<>
						<Link href={paths.transferFunds.root}>
							<a>
								<span>{t('Label_TransferFunds')}</span>
							</a>
						</Link>

						<Link href={paths.withdrawal.root}>
							<a>
								<span>{t('Label_Withdrawal')}</span>
							</a>
						</Link>

						<Link href={paths.history.root}>
							<a>
								<span>{t('Label_History')}</span>
							</a>
						</Link>

						<Link href={paths.deposit.root}>
							<a>
								<span>{t('Label_Deposit')}</span>
							</a>
						</Link>

						<Wallet />

						<MemberFile />

						<Link href={paths.message.root}>
							<MsgPopUp />
						</Link>

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
							<a className='forgot'>{t('Label_ForgetPassword')}</a>
						</Link>
					</>
				)}
			</Header.Function>
			<Header.Menu />
		</Header>
	)
}

export default LayoutHeader
