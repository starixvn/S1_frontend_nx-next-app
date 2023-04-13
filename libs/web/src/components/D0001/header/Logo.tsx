import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ILogoProps {
	logoUrl: string
}

const Logo = ({ logoUrl }: ILogoProps) => {
	return (
		<div className='logo'>
			<Link className='logo' href='/'>
				<a>
					{/* <img src={logoUrl} alt='logo' /> */}
					{/* 先用原生 img 查看寬高，再給予定寬高 */}
					<Image src={logoUrl} alt='logo' width={150} height={66} />
				</a>
			</Link>
			<Link
				href={`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`}
				className='logo'
				passHref
			>
				<a target='_blank' rel='noopener noreferrer' className='rewardsLogo'>
					<Image
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/88rewards.png`}
						alt='88reward'
						width={65}
						height={65}
					/>
				</a>
			</Link>
		</div>
	)
}

export default Logo
