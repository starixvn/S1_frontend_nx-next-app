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

                <img src={logoUrl} alt='logo' />

            </Link>
			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				(<Link
                    href={`${process.env['NEXT_PUBLIC_ENV_DB_HOST']}/rewards/`}
                    className='logo'
                    passHref
                    target='_blank'
                    rel='noopener noreferrer'>

                    <img src={rewardsUrl} alt='88reward' />

                </Link>)
			)}
		</div>
    );
}

export default Logo
