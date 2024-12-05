import { Form } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	LineLoginDirectTypeEnum,
	useLazyGetLineLoginDirectUrlQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginForm } from './form'

const Login = ({ fromRoute }: { fromRoute: string }) => {
	const router = useRouter()
	const { t } = useTranslation()

	const {
		onSignIn,
		userInfo: { currencyId },
	} = useAuth()
	const { modal } = useGlobalModal()

	const formMethods = useForm()
	const { handleSubmit, getValues } = formMethods

	const [getLineLoginDirectUrl] = useLazyGetLineLoginDirectUrlQuery()

	const handleSignIn = async () => {
		const { userName, password } = getValues()
		try {
			await onSignIn({
				userName,
				password,
			})
			router.push(fromRoute)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleLineLogin = async () => {
		try {
			const { data: lineLoginDirectUrl } = await getLineLoginDirectUrl({
				type: LineLoginDirectTypeEnum.Login,
			}).unwrap()

			if (lineLoginDirectUrl) {
				window.location.href = lineLoginDirectUrl
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return (
		<>
			{currencyId === CurrenciesEnum.THB && (
				<div className='register-line'>
					<div className='btn-group'>
						<button
							className='btn-line'
							type='button'
							onClick={handleLineLogin}
						>
							<i className='icon icon-line-bold' />
							{t('Label_General_LogIn')}
						</button>
					</div>
				</div>
			)}
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
