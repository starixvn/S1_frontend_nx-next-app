import Link from 'next/link'
import { Header, LoginFormType } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
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
								<span>{t('Label_General_TransferFunds')}</span>
							</a>
						</Link>

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
							<a>
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
			<Header.Menu />
		</Header>
	)
}

export default LayoutHeader
