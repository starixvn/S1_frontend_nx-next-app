'use client'

// 在app 上不使用modal 直接用alert顯示
/* eslint-disable no-alert */
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { IAppSignInData } from 'libs/web/src/service/authApi/type'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../../common'
import { LoginForm } from './form'

declare global {
	interface Window {
		webkit?: {
			messageHandlers: {
				[x: string]: {
					postMessage: (data: string) => void
				}
			}
		}
		OnebookInterface: {
			postMessage: (data: string) => void
		}
	}
}

declare const window: Window

const AppLogin = () => {
	const { getBannerUrl } = useGlobalData()
	const { onAppSignIn } = useAuth()

	const formMethods = useForm()
	const { handleSubmit, getValues } = formMethods

	let appInterface: { postMessage: (data: string) => void }

	const handleSignIn = async () => {
		const { userName, password } = getValues()
		try {
			const response = await onAppSignIn({
				userName,
				password,
			})

			if (response.errorCode === 0) {
				onebookPostMessage(response.data)
			} else {
				alert(response.message)
			}
		} catch (error) {
			alert((error as Error).message)
		}
	}

	const onebookPostMessage = (data: IAppSignInData) => {
		const { userName, token } = data

		const parameter = JSON.stringify({
			act: 'login',
			data: {
				token,
				transfer: `${window.location.origin}${paths.appDeposit.root}?userName=${userName}`,
			},
		})

		if (appInterface) {
			appInterface.postMessage(parameter)
		} else {
			throw new Error('OnebookInterface is missing')
		}
	}

	useEffect(() => {
		// initialize appInterface
		appInterface = window.webkit
			? window.webkit.messageHandlers.OnebookInterface
			: window.OnebookInterface
	}, [])

	return (
		<div style={{ height: '100vh', width: '100vw', position: 'fixed' }}>
			<main className='main login'>
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

export default AppLogin
