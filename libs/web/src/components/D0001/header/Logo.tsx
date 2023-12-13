import Image from 'next/future/image'
import Link from 'next/link'
import { paths } from '../../../app/constants'

interface ILogoProps {
	logoUrl: string
	rewardsUrl: string
	showSpLogo: boolean
}

const Logo = ({ logoUrl, rewardsUrl, showSpLogo }: ILogoProps) => {
	return (
		<div className='logo'>
			<Link className='logo' href={paths.home.root}>
				<a>
					<img src={logoUrl} alt='logo' />
				</a>
			</Link>
			{showSpLogo && <a className='splogo' />}

			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				<Link
					href={`${process.env['NEXT_PUBLIC_REWARD_HOST']}`}
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
