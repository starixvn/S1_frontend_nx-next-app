import Link from 'next/link'
import classNames from 'classnames'
import { isEventPeriod } from '@nx-next-app/utils'
import { EVENT_PERIOD } from '@nx-next-app/site/nova88'
import { useEffect, useState } from 'react'
import { paths } from '../../../app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
	showSpLogo: boolean
}

const Logo = ({ logoUrl, rewardsUrl, showSpLogo }: ILogoProps) => {
	const [isInOlympicPeriod, setIsInOlympicPeriod] = useState(false)

	useEffect(() => {
		setIsInOlympicPeriod(isEventPeriod(EVENT_PERIOD.OLYMPIC))
	}, [])
	return (
		<div className={classNames('logo', { olympic: isInOlympicPeriod })}>
			{/* 奧運期間使用奧運LOGO */}
			<Link href={paths.home.root}>
				<a>
					{isInOlympicPeriod ? (
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/logo-nova88.webp`}
							alt='olympic logo'
						/>
					) : (
						<img src={logoUrl} alt='logo' />
					)}
				</a>
			</Link>

			{showSpLogo && isInOlympicPeriod && <a className='splogo' />}

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
