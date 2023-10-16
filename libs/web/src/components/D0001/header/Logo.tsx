import Image from 'next/future/image'
import Link from 'next/link'
import { paths } from '../../../app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
}

const Logo = ({ logoUrl, rewardsUrl }: ILogoProps) => {
	return (
		<div className='logo'>
			<Link className='logo' href={paths.home.root}>
				<a>
					<Image
						src={logoUrl}
						alt='logo'
						width={187}
						height={40}
						style={{ width: '187px', height: '40px' }}
					/>
				</a>
			</Link>
			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				<Link
					href={`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`}
					className='logo'
					passHref
				>
					<a target='_blank' rel='noopener noreferrer' className='rewardsLogo'>
						<Image src={rewardsUrl} alt='88reward' width={65} height={65} />
					</a>
				</Link>
			)}
		</div>
	)
}

export default Logo
