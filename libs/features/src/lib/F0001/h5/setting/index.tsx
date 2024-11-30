import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { WrapperSettingPage } from '@nx-next-app/features/F0001/h5/setting/styles'
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
		</WrapperSettingPage>
	)
}

export default Setting
