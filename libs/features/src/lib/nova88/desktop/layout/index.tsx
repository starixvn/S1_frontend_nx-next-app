import Link from 'next/link'
import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import {
	Footer,
	GlobalModal,
	Header,
	useConfig,
} from '@nx-next-app/components/D0001'

import { useAuth } from '../auth-context'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	const { auth } = useAuth()
	const { globalModal, resetModal } = useConfig()

	const { onSignIn, onSignOut } = useAuth()

	const {
		t,
		i18n: { language },
	} = useTranslation()

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${
		language === 'cs' ? 'logo_cs' : 'logo_en'
	}.png`

	return (
		<>
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

							<Header.Function.Country />

							<button
								onClick={onSignOut}
								type='button'
								className='icon icon-exit'
							/>
						</>
					) : (
						<>
							<Header.Function.Login onLogin={onSignIn} />
							<Header.Function.Country />
							<Link href='forget-password'>
								<a className='forgot'>{t('Label_ForgetPassword')}</a>
							</Link>
						</>
					)}
				</Header.Function>
				<Header.Menu />
			</Header>
			{children}

			<GlobalModal {...globalModal} resetModal={resetModal} />

			<Footer />
		</>
	)
}

export default Layout
