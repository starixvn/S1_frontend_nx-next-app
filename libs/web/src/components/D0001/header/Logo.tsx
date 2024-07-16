import { useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { isEventPeriod } from '@nx-next-app/utils'
import { paths, EVENT_PERIOD } from '@nx-next-app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
	// showSpLogo: boolean
}

const Logo = ({ logoUrl, rewardsUrl }: ILogoProps) => {
	const [showSpLogo, setShowSpLogo] = useState(true)
	const [isInOlympicPeriod, setIsInOlympicPeriod] = useState(false)

	// TODO: 因為奧運結束後可能會有暫時沒有spLogo的情況，這時主Logo要改用沒有右邊分隔線的圖
	const noSpLogoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo_w_noline.png`

	useEffect(() => {
		// 如果不在奧運期間又還沒有新的spLogo，就先設成false去顯示沒有右邊分隔線的圖
		if (!isEventPeriod(EVENT_PERIOD.OLYMPIC)) {
			setShowSpLogo(false)
		}

		setIsInOlympicPeriod(isEventPeriod(EVENT_PERIOD.OLYMPIC))
	}, [])
	return (
		<div className={classNames('logo', { olympic: isInOlympicPeriod })}>
			{/* 奧運期間使用奧運LOGO */}
			<Link href={paths.home.root} style={{ cursor: 'pointer' }}>
				<a>
					{isInOlympicPeriod ? (
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/logo-nova88.webp`}
							alt='olympic logo'
						/>
					) : (
						<img src={showSpLogo ? logoUrl : noSpLogoUrl} alt='logo' />
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
