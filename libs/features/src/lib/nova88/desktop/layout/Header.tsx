import Link from 'next/link'
import {
	Header,
	LoginFormType,
	useGlobalModal,
} from '@nx-next-app/components/D0001'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { FieldErrors } from 'react-hook-form'
import { renderFieldError } from '@nx-next-app/utils'
import { UserInfoMemberType } from '@nx-next-app/service'
import { Country } from './Country'

const LayoutHeader = () => {
	const {
		t,
		i18n: { language },
	} = useTranslation()
	const router = useRouter()

	const { modal } = useGlobalModal()

	const { auth, userInfo, onSignIn, onSignOut } = useAuth()

	// TODO: wip feat
	// eslint-disable-next-line no-console
	// console.log(userInfo?.memberType === UserInfoMemberType.LiveStreaming)

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
						<a href='/en/transfer-funds'>
							<span>Transfer Funds</span>
						</a>

						<a href='/en/withdrawal'>
							<span>Withdrawal</span>
						</a>

						<a href='/en/history'>
							<span>History</span>
						</a>

						<a href='/en/deposit'>
							<span>Deposit</span>
						</a>

						<Header.Function.Wallet />

						<Header.Function.MemberFile />

						<a className='icon icon-email' href='/en/message' />

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
						<Link href='forget-password'>
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
