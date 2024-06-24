import Link from 'next/link'
import classNames from 'classnames'
import { isEventPeriod } from '@nx-next-app/utils'
import { EVENT_PERIOD } from '@nx-next-app/site/nova88'
import { paths } from '../../../app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
	showSpLogo: boolean
}

const Logo = ({ logoUrl, rewardsUrl, showSpLogo }: ILogoProps) => {
	return (
		<div className={classNames('logo')}>
			<Link href={paths.home.root}>
				{/* 奧運期間使用奧運LOGO */}
				{isEventPeriod(EVENT_PERIOD.OLYMPIC) ? (
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/logo-nova88.webp`}
							alt='olympic logo'
						/>
					</a>
				) : (
					<a>
						<img src={logoUrl} alt='logo' />
					</a>
				)}
			</Link>
			{showSpLogo && <a className='splogo' />}

			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				<Link href='/rewards' className='logo' passHref>
					<a target='_blank' rel='noopener noreferrer' className='rewardsLogo'>
						<img src={rewardsUrl} alt='88reward' />
					</a>
				</Link>
			)}
		</div>
	)
}

export default Logo
