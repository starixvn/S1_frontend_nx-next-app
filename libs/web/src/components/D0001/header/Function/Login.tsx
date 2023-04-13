import React from 'react'

const Login = () => {
	return (
		<>
			<input placeholder='Username' />
			<input placeholder='Password' />
			<a href='login.html' className='login'>
				Log In
			</a>
			<a href='join.html' className='join'>
				Join Now
			</a>
		</>
	)
}

export default Login
