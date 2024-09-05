import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { Trans } from 'next-i18next'
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
		<main className={classNames('menu', { after: isLogin })}>
			{isLogin ? (
				<Profile />
			) : (
				<>
					<button className='close-btn' onClick={() => push(paths.home.root)}>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/close-icon.png`}
							alt='close'
						/>
					</button>
					<Link href={paths.home.root}>
						<a>
							<div className='menu-logo'>
								<div>Wellcome to</div>
								<div>
									<Trans
										className=''
										i18nKey='Label_App_Setting_Title'
										components={{
											span: <span />,
										}}
									/>
								</div>
							</div>
						</a>
					</Link>
				</>
			)}
			<Shortcut />
			<List />
		</main>
	)
}

export default Setting
