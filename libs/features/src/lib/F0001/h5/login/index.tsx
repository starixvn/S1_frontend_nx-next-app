import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isString } from 'lodash-es'

const Login = () => {
	const { push, query } = useRouter()
	const { t } = useTranslation()
	const fromRoute = isString(query['from']) ? query['from'] : paths.home.root

	return (
		<div className='logoSwitch active'>
			<button
				data-testid='close_join_modal_btn'
				onClick={() => push(fromRoute)}
			>
				<div className='icon icon-close' />
			</button>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/logo_en_w.png`}
				alt='logo'
			/>
			<button className='switch'>
				<div className='switchBg' />
				<div className='switchLogin active'>
					<Link
						href={{
							pathname: paths.login.root,
							query: { from: fromRoute },
						}}
					>
						<a>{t('Label_General_LogIn')}</a>
					</Link>
				</div>
				<div className='switchJoin'>
					<Link
						href={{
							pathname: paths.join.root,
							query: { from: fromRoute },
						}}
					>
						<a>{t('Label_General_Join')}</a>
					</Link>
				</div>
			</button>
			<div className='Login active'>
				<div className='infoModule '>
					<div className='inputInfo ' data-testid='inputInfo'>
						For security, we suggest that your username does not contain your
						real name.
					</div>
					<div className='inputBox '>
						<i className='icon icon-member' />
						<input
							data-testid='UserName_ipt'
							placeholder='Username'
							type='text'
							className='textRight'
							value=''
						/>
						<div className='icon-module' />
						<i data-testid='showTipBtn' className='icon icon-information' />
					</div>
				</div>
				<div className='tip' data-testid='UserName_msg' />
			</div>
			<div className='infoModule'>
				<div className='inputBox '>
					<i className='icon icon-key' />
					<input
						data-testid='Password_ipt'
						type='password'
						placeholder='Password'
						value=''
					/>
					<div className='icon-module'>
						<i data-testid='showPsw' className='icon icon-eye-blocked' />
					</div>
				</div>
			</div>
			<div className='Terms' data-testid='forgetpw'>
				<a href='/en/forget-password'>Forgot your Password?</a>
			</div>
			<div className='btn-group'>
				<button data-testid='login_submit'>Log In</button>
			</div>
			<a href='/en/'>
				<div className='visit'>
					I would like to visit !<i className='icon icon-visit' />
				</div>
			</a>
		</div>
	)
}

export default Login
