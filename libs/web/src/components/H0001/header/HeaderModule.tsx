import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import classNames from 'classnames'
import Image from 'next/future/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

type IHeaderModuleProps = HTMLAttributes<HTMLDivElement>

const HeaderModule = ({ className, ...props }: IHeaderModuleProps) => {
	const { auth, userInfo } = useAuth()

	return (
		<div className={classNames('headerModule dragon', className)} {...props}>
			<a href='/en'>
				<Image
					className='dragonlogo'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dragon-logo.png`}
					alt='logo'
					height={55}
					width={107}
					style={{ height: 55, width: 107 }}
				/>
				<Image
					className='dragon-light'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dragon-light.png`}
					alt='logo-light'
					height={42}
					width={26}
					style={{ height: 42, width: 26 }}
				/>
			</a>

			{!auth.isLogin && (
				<div>
					<div className='headerInfo'>
						Welcome
						<Link className='MemberID' href={paths.profile.root}>
							{userInfo.userName}
						</Link>
					</div>
					<div className='Balance'>
						<button className='icon icon-minus'>MYR </button>
						<div>
							$103,107.95
							<button className='icon icon-spinner11 clickBtn' />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default HeaderModule
