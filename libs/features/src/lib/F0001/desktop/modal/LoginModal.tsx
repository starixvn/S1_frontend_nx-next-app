import { useGlobalModal } from '@nx-next-app/components/D0001'

/* 
* 預期使用方式
import dynamic from 'next/dynamic'
const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

modal.open(<LoginModal />)
*/

const LoginModal = () => {
	const { closeModal } = useGlobalModal()

	return (
		<div className='loginpop active'>
			<div className='joinloginModule'>
				<div className='loginAnimation'>
					<img
						className='animationlogo'
						alt='animationlogo'
						src='https://image.0814media.net/SiteSkin/img/logo_en_w.png'
					/>

					<img
						className='npc1'
						alt='npc1'
						src='https://banner.0814media.net/desktop/img/loginNpc01.png'
					/>
					<img
						className='npc2'
						alt='npc2'
						src='https://banner.0814media.net/desktop/img/loginNpc02.png'
					/>
					<img
						className='welcome'
						alt='welcome'
						src='https://banner.0814media.net/desktop/img/welcome.png'
					/>
					<img
						className='back'
						alt='back'
						src='https://banner.0814media.net/desktop/img/back.png'
					/>
				</div>

				<form className='joinloginFunction'>
					<div className='title txt-orange'>登入</div>
					<div className='noAccount'>
						没有账户吗?{' '}
						<button className='txt-orange' type='button'>
							立即加入
						</button>
					</div>
					<div className='inputModule'>
						<div className='inputBox-org'>
							<i className='icon icon-member txt-orange' />
							<input
								data-testid='input'
								type='text'
								placeholder='用戶名'
								value=''
							/>
							<div className='iconModule'>
								<i className='icon icon-information' />
							</div>
						</div>
						<div className='tip' />
						<div className='inputBox-org'>
							<i className='icon icon-key txt-orange' />
							<i className='txt-blue' />
							<input type='password' placeholder='密码' value='' />
							<div className='iconModule'>
								<i className='icon icon-eye-blocked' />
							</div>
						</div>
						<a className='txt-blue2' href='/cs/forget-password'>
							忘记密码吗？
						</a>
					</div>
					<div className='btnGroup'>
						<button className='btn-cancel' type='button' onClick={closeModal}>
							取消
						</button>
						<button className='btn-check' type='submit'>
							登入
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginModal
