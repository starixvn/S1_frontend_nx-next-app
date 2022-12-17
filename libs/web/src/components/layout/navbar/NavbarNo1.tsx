import { useAuth } from '../../../hooks'

export interface INavbarNo1Props {
	value?: string
}

const NavbarNo1 = ({ value }: INavbarNo1Props) => {
	const { isSignIn, onSignIn, onSignOut } = useAuth()

	return (
		<div>
			<button
				type='button'
				onClick={() => {
					onSignIn({ userName: 'luketestmyr01', password: '1q2w3e4r' })
				}}
			>
				SignIn
			</button>
			<button
				type='button'
				onClick={() => {
					onSignOut()
				}}
			>
				SignOut
			</button>
			NavbarNo1 {JSON.stringify(isSignIn)}
		</div>
	)
}

export default NavbarNo1
