import Link from 'next/link'
import classNames from 'classnames'
import { isEventPeriod } from '@nx-next-app/utils'
import { OLYMPIC_EVENT_PERIOD } from '@nx-next-app/site/nova88/constants/olympicPeriod'
import { paths } from '../../../app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
	showSpLogo: boolean
}

const Logo = ({ logoUrl, rewardsUrl, showSpLogo }: ILogoProps) => {
	return (
		<div
			className={classNames('logo', {
				olympic: isEventPeriod(OLYMPIC_EVENT_PERIOD),
			})}
		>
			<Link className='logo' href={paths.home.root}>
				<a>
					<img src={logoUrl} alt='logo' />
				</a>
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
