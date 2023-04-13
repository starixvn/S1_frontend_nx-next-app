import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer, Header } from '@nx-next-app/components/D0001'
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'

interface ILayoutProps {
	children: ReactNode
}

// *  test only, remove later
const isSignIn = true

export function Layout({ children }: ILayoutProps) {
	const {
		i18n: { language },
	} = useTranslation()

	const logoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${
		language === 'cs' ? 'logo_cs' : 'logo_en'
	}.png`

	return (
		<Provider store={store}>
			<Header>
				<Header.Logo logoUrl={logoUrl} />
				<Header.Function>
					{isSignIn ? (
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

							<button type='button' className='icon icon-exit' />
						</>
					) : (
						<>
							<Header.Function.Login />
							<a href='forgetPassword.html' className='forgot'>
								Forgotten your<span>password?</span>
							</a>
						</>
					)}
				</Header.Function>
				<Header.Menu />
			</Header>
			{children}
			<Footer />
		</Provider>
	)
}

export default Layout
