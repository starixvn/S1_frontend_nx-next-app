import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperSettingPage } from '@nx-next-app/features/F0001/h5/setting/styles'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import List from './List'
import Profile from './Profile'
import Shortcut from './Shortcut'

const Setting = () => {
	const { push } = useRouter()
	const {
		auth: { isLogin },
	} = useAuth()

	return (
		<WrapperSettingPage>
			<main className={classNames('menu', { after: isLogin })}>
				{isLogin ? (
					<Profile />
				) : (
					<>
						<button className='close-btn' onClick={() => push(paths.home.root)}>
							<i className='icon icon-close-line' />
						</button>
						<Link href={paths.home.root}>
							<a>
								<div className='menu-logo'>
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/logo_w.webp`}
										alt=''
										className='logo-mobile'
									/>
								</div>
							</a>
						</Link>
					</>
				)}
				<Shortcut />
				<List />
			</main>
		</WrapperSettingPage>
	)
}

export default Setting
