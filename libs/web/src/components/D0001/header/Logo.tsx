import Image from 'next/future/image'
import Link from 'next/link'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
}

const Logo = ({ logoUrl, rewardsUrl }: ILogoProps) => {
	return (
		<div className='logo'>
			<Link className='logo' href='/'>
				<a>
					{/* 先用原生 img 查看寬高，再給予定寬高 */}
					<Image src={logoUrl} alt='logo' width={150} height={66} />
					{/* <img src={logoUrl} alt='logoUrl' /> */}
				</a>
			</Link>
			<Link
				href={`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`}
				className='logo'
				passHref
			>
				<a target='_blank' rel='noopener noreferrer' className='rewardsLogo'>
					<Image src={rewardsUrl} alt='88reward' width={65} height={65} />
				</a>
			</Link>
		</div>
	)
}

export default Logo
