import {
	useCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} from '@nx-next-app/api'

export interface IAuthProps {
	isSignIn: boolean
	onSignIn: () => void
	onSignOut: () => void
}

export const useAuth = () => {
	const { isError, isFetching } = useCheckSignInQuery(null)
	const [signIn] = useSignInMutation()
	const [signOut] = useSignOutMutation()

	const onSignIn = async ({
		userName,
		password,
	}: {
		userName: string
		password: string
	}) => {
		try {
			await signIn({
				userName,
				userpwd: password,
				isPersistent: true,
			}).unwrap()
		} catch (error) {
			//
		}
	}

	const onSignOut = async () => {
		try {
			await signOut(null).unwrap()
		} catch (error) {
			//
		}
	}

	const isSignIn = !isError && !isFetching

	return { isSignIn, onSignIn, onSignOut }
}
