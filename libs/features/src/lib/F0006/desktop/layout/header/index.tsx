import Link from 'next/link'
import { includes } from 'lodash-es'
import { Header, LoginFormType } from '@nx-next-app/components/D0006'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { FieldErrors } from 'react-hook-form'
import { renderFieldError } from '@nx-next-app/utils'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/yashbet'
import MemberFile from './MemberFile'
import MsgPopUp from './MsgPopUp'
import Country from './Country'
import Wallet from './Wallet'
import Menu from './Menu'

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
			modal.info((error as Error).message)
		}
	}

	const handleLoginInvalid = (errors: FieldErrors<LoginFormType>) => {
		modal.error(renderFieldError(errors))
	}

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/logo.png`

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
							(<Link href={paths.transferFunds.root}>

                                <span>{t('Label_General_TransferFunds')}</span>

                            </Link>)
						)}

						<Link href={paths.withdrawal.root}>

                            <span>{t('Label_General_Withdrawal')}</span>

                        </Link>

						<Link href={paths.history.root}>

                            <span>{t('Label_General_History')}</span>

                        </Link>

						<Link href={paths.deposit.root}>

                            <span>{t('Label_General_Deposit')}</span>

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
						<Link href={paths.forgetPassword.root} className='forgot'>
							{t('Label_Header_ForgetPassword')}
						</Link>
					</>
				)}
			</Header.Function>

			<Menu />
		</Header>
    );
}

export default LayoutHeader
