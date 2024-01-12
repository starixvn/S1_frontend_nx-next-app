import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/future/image'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
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
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/close-icon.png`}
							width={14}
							height={14}
							alt='close'
						/>
					</button>
					<Link href={paths.home.root}>
						<a>
							<div className='menu-logo'>
								<div>Wellcome to</div>
								<div>
									NOVA<span>88</span>
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
