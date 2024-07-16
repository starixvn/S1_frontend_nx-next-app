import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { PASSWORD_REGEX } from '@nx-next-app/constants'
import InputBox from '../InputBox'

const InputBasic = () => {
	const {
		handleSubmit,
		register,
		trigger,
		reset,
		formState,
		getFieldState,
		setError,
		getValues,
	} = useForm()

	const { errors, touchedFields } = formState
	const [loadingState, setLoadingState] = useState(false)

	const checkUserName = async () => {
		await trigger('userName')
		const { error } = getFieldState('userName')
		const name = getValues('userName')
		if (error) return
		// fake async timeout
		setLoadingState(true)
		await setTimeout(() => {
			setLoadingState(false)
			// custom error
			if (name === 'test') {
				setError('userName', { type: 'duplicate', message: '名字重複囉' })
			}
		}, 1000)
	}

	const checkPassword = async () => {
		// trigger password
		await trigger('password')
	}

	const onSubmit = async (data: FieldValues) => {
		// do something submit
		reset()
	}

	return (
		<form className='joinloginFunction' onSubmit={handleSubmit(onSubmit)}>
			<div className='inputModule'>
				<InputBox
					register={register('userName', {
						required: { value: true, message: '要想多久？' },
						onBlur: checkUserName,
					})}
					icon='icon-member txt-blue'
					placeholder='你的名字'
					loading={loadingState}
					errorMessage={errors['userName']?.message as string}
					error={!!errors['userName']}
					touched={!!touchedFields['userName']}
					successMessage='要確定餒！'
					infoMessage='這是InfoMessage'
				/>
				<InputBox
					register={register('password', {
						required: { value: true, message: '不填是怎樣？' },
						pattern: {
							value: PASSWORD_REGEX,
							message: '密码长度必须 6 至 15 个字符，包含字母数字。',
						},
						onBlur: checkPassword,
					})}
					password
					icon='icon-key txt-blue'
					placeholder='你的密碼'
					errorMessage={errors['password']?.message as string}
					error={!!errors['password']}
					touched={!!touchedFields['password']}
				/>
			</div>
			<div className='btnGroup'>
				<button
					type='button'
					className='btn-cancel'
					onClick={event => {
						event.preventDefault()
						reset()
					}}
				>
					Cancel
				</button>
				<button className='btn-check' type='submit'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default InputBasic
