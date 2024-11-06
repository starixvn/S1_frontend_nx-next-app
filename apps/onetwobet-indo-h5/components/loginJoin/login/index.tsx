import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../../common'
import { LoginForm } from './form'

const Login = () => {
	const router = useRouter()
	const { getBannerUrl } = useGlobalData()
	const { onSignIn } = useAuth()
	const { modal } = useGlobalModal()

	const formMethods = useForm()
	const { handleSubmit, getValues } = formMethods

	const handleSignIn = async () => {
		const { userName, password } = getValues()
		try {
			await onSignIn({
				userName,
				password,
			})
			router.push(paths.home.root)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const { query } = router
	const fromRoute = query['from'] ? String(query['from']) : paths.home.root

	return (
		<div style={{ height: '100vh', width: '100vw', position: 'fixed' }}>
			<main className='main login'>
				<Link href={fromRoute}>
					<button className='close-btn'>
						<img src={getBannerUrl('/h5/img/4.0/close-icon.png')} alt='close' />
					</button>
				</Link>
				<div className='logo'>
					<img src={getBannerUrl('/h5/img/logo.png')} alt='logo' />
				</div>
				<FormProvider {...formMethods}>
					<Form onSubmit={handleSubmit(handleSignIn)}>
						<LoginForm />
					</Form>
				</FormProvider>
			</main>
		</div>
	)
}

export default Login
