import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { paths } from '@nx-next-app/constants'
import { Form } from '@nx-next-app/components/H0001'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { LoginForm } from './form'

const Login = () => {
	const router = useRouter()
	const { t } = useTranslation()

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

	return (
		<>
			<FormProvider {...formMethods}>
				<Form onSubmit={handleSubmit(handleSignIn)}>
					<LoginForm />
				</Form>
			</FormProvider>
			<Link href={paths.home.root}>
				<a>
					<div className='visit'>
						{t('Label_Join_IWouldLikeToVisit')}
						<i className='icon icon-visit' />
					</div>
				</a>
			</Link>
		</>
	)
}

export default Login
