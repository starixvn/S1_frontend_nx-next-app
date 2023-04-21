import { SubmitHandler, useForm } from 'react-hook-form'
import Form from '../../form'

type LoginFormType = {
	userName: string
	password: string
}

interface ILoginProps {
	onLogin: SubmitHandler<LoginFormType>
}

const Login = ({ onLogin }: ILoginProps) => {
	const { register, handleSubmit } = useForm<LoginFormType>()

	return (
		<>
			<Form onSubmit={handleSubmit(onLogin)} component={false}>
				<input
					defaultValue=''
					placeholder='Username'
					{...register('userName')}
				/>
				<input
					type='password'
					defaultValue=''
					placeholder='Password'
					{...register('password')}
				/>
			</Form>

			<button type='button' onClick={handleSubmit(onLogin)} className='login'>
				Log In
			</button>
			<button type='button' className='join'>
				Join Now
			</button>
		</>
	)
}

export default Login
